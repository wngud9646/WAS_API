'use strict'

module.exports = async function(fastify, opts) {
  fastify.get("/",{onRequest: [fastify.authenticate]}, async function(request, reply) {
    const client = await fastify.pg.connect()

    let tokens = request.headers.authorization
    tokens = tokens.toString()
    tokens = tokens.split(' ')

    // let payload = { "student_id": test}
    // let str = fastify.jwt.sign(payload)  

    let tokenstr = fastify.jwt.decode(tokens[1])
    let str = Object.values(tokenstr)[0]

    let query = 'SELECT * FROM public.registration WHERE student_id=' + str
    let querytest = 'SELECT r.registration_id, r.student_id, r.course_id, s.student_name, c.course_name, c.course_type, i.instructor_name FROM public.registration r LEFT OUTER JOIN public.student s on r.student_id=s.id LEFT OUTER JOIN public.course c on r.course_id=c.id LEFT OUTER JOIN public.instructor i on c.instructor_id=i.id WHERE student_id=' + str

    try {
        const { rows } = await client.query(
          querytest
        )

        reply.code(200).send(rows)
      } finally {
        client.release()
      }
    }
  )

  fastify.post("/",{onRequest: [fastify.authenticate]}, async function(request, reply){
    const client = await fastify.pg.connect()

    let tokens = request.headers.authorization
    tokens = tokens.toString()
    tokens = tokens.split(' ')

    let tokenstr = fastify.jwt.decode(tokens[1])
    let str = Object.values(tokenstr)[0]

    let body = request.body
    let bodystr = Object.values(body)[0]

    let query = 'INSERT INTO public.registration (student_id, course_id) VALUES (' + str + ',' +bodystr+ ') RETURNING *'
    let validate = 'SELECT * FROM public.course WHERE id=' + bodystr

    let validateresult = await client.query(validate)

    if(!validateresult.rowCount){
        reply.code(404).send('해당 강좌 ID는 존재하지 않습니다')
    }else{
        try {
            const { rows } = await client.query(
                query
            )
    
            reply.code(201).send(rows)
          } finally {
            client.release()
          }
    }
  })

  fastify.delete("/", {onRequest: [fastify.authenticate]}, async function(request, reply){
    const client = await fastify.pg.connect()

    let tokens = request.headers.authorization
    tokens = tokens.toString()
    tokens = tokens.split(' ')

    let tokenstr = fastify.jwt.decode(tokens[1])
    let str = Object.values(tokenstr)[0]

    let body = request.body
    let bodystr = Object.values(body)[0]

    let query = `DELETE FROM public.registration WHERE (student_id,course_id) = ('${str}','${bodystr}') RETURNING *`;
    
    try {
        const { rows } = await client.query(query)

        if(rows.length === 0){
            reply.code(404).send ('수강신청 내역이 없습니다.');
        } else {
            reply.code(200).send ('수강신청이 취소되었습니다.');
        }
    } finally {
        client.release()
    }
})
}

