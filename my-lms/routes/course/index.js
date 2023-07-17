'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async (req, reply) => {
    const client = await fastify.pg.connect()
    
    let str = Object.keys(req.query)
    let queryparams, querys, querytest

    if(str == 'instructor_id'){
    queryparams=req.query.instructor_id
    querys = 'SELECT * FROM public.course WHERE instructor_id=' + queryparams
    querytest = 'SELECT c.id, c.course_name, c.course_type, i.instructor_name FROM public.course c LEFT OUTER JOIN public.instructor i on c.instructor_id=i.id WHERE instructor_id=' + queryparams

    try {
      const { rows } = await client.query(
        querytest
      )
      reply.code(200).send(rows)
    } finally {
      client.release()
      client.end()
    }
    }else if(str == 'course_name'){
        queryparams=req.query.course_name
        querys = 'SELECT * FROM public.course WHERE course_name=' + queryparams
        querytest = 'SELECT c.id, c.course_name, c.course_type, i.instructor_name FROM public.course c LEFT OUTER JOIN public.instructor i on c.instructor_id=i.id WHERE course_name=' + queryparams
        try {
          const { rows } = await client.query(
            querytest
          )
          reply.code(200).send(rows)
        } finally {
          client.release()
          client.end()
        }  
    }else if(str == 'course_type'){
        queryparams=req.query.course_type
        querytest = 'SELECT c.id, c.course_name, c.course_type, i.instructor_name FROM public.course c LEFT OUTER JOIN public.instructor i on c.instructor_id=i.id WHERE course_type=' + queryparams
        try {
          const { rows } = await client.query(
            querytest
          )
          reply.code(200).send(rows)
        } finally {
          client.release()
        }
    }else{
        try {
            const { rows } = await client.query(
              'SELECT c.id, c.course_name, c.course_type, i.instructor_name FROM public.course c LEFT OUTER JOIN public.instructor i on c.instructor_id=i.id'
            )
      
            reply.code(200).send(rows)
          } finally {
            client.release()
          }
    }
  })
  fastify.post("/",{onRequest: [fastify.authenticate]}, async function(request, reply){
    const client = await fastify.pg.connect()

    let tokens = request.headers.authorization
    tokens = tokens.toString()
    tokens = tokens.split(' ')

    let tokenstr = fastify.jwt.decode(tokens[1])
    let str = Object.values(tokenstr)[0]
    let instructor = Object.keys(tokenstr)[0]

    let body = request.body

    let query = 'INSERT INTO public.course (course_name, instructor_id, course_type) VALUES (\'' + Object.values(body)[0] + '\','+ str +',\''+ Object.values(body)[1]+ '\') RETURNING *'
    let validate = 'SELECT * FROM public.instructor WHERE id=' + str

    let validateresult = await client.query(validate)

    if(instructor == 'instructor_id' && validateresult.rowCount){
      try {
        const { rows } = await client.query(
          query
        )

        //let newInsert = Object.values(rows)[0]
        //newInsert = Object.values(newInsert)[0]
        //let newquery= 'SELECT * FROM public.registration WHERE registration_id=' + newInsert
        //const { rows1 } = await client.query(
        //    newquery
        //)
        

        reply.code(201).send(rows)
      } finally {
        client.release()
        client.end()
      }
    }else{
      reply.code(404).send('invalid instructor id')
    }    
  })
  fastify.patch("/",{onRequest: [fastify.authenticate]}, async function(request, reply){
    const client = await fastify.pg.connect()

    let tokens = request.headers.authorization
    tokens = tokens.toString()
    tokens = tokens.split(' ')

    let tokenstr = fastify.jwt.decode(tokens[1])
    let str = Object.values(tokenstr)[0]
    let instructor = Object.keys(tokenstr)[0]

    let body = request.body
    let bodyvalue=''

    for(let i=1; i< Object.values(body).length; i++){
        if(i+1 ==  Object.values(body).length){
            bodyvalue = bodyvalue + Object.keys(body)[i]+ "=\'" + Object.values(body)[i] + "\'"
        }else{
            bodyvalue = bodyvalue + Object.keys(body)[i] + "=\'" + Object.values(body)[i]+ "\',"
        }
    }
    let query = 'UPDATE public.course SET ' + bodyvalue + ' WHERE id=' + Object.values(body)[0] + ' RETURNING *'

    if(instructor == 'instructor_id'){
      try {
        const { rows } = await client.query(
          query
        )

        reply.code(200).send(rows)
      } finally {
        client.release()
        client.end()
      }
    }else{
      reply.code(404).send('not a instructor')
    }
})
}