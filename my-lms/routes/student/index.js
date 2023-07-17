'use strict'

module.exports = async function(fastify, opts){
    fastify.patch("/",{onRequest: [fastify.authenticate]}, async function(request, reply){
        const client = await fastify.pg.connect()
    
        let tokens = request.headers.authorization
        tokens = tokens.toString()
        tokens = tokens.split(' ')
        
        let tokenstr = fastify.jwt.decode(tokens[1])
        let str = Object.values(tokenstr)[0]
        //let str1 = Object.keys(tokenstr)[0]

        let body = request.body
        //let bodyvalue = Object.values(body)
        //let bodykey = Object.keys(body)
        let bodyvalue=''

        for(let i=0; i< Object.values(body).length; i++){
            if(i+1 ==  Object.values(body).length){
                bodyvalue = bodyvalue + Object.keys(body)[i]+ "=\'" + Object.values(body)[i] + "\'"
            }else{
                bodyvalue = bodyvalue + Object.keys(body)[i] + "=\'" + Object.values(body)[i]+ "\',"
            }
        }

        

        let query = 'UPDATE public.student SET ' + bodyvalue + 'WHERE id=' + str + 'RETURNING *'

        try {
            const { rows } = await client.query(
                query
            )
    
            reply.code(200).send(rows)
          } finally {
            client.release()
          }
    })
}