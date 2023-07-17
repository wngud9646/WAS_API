module.exports = async function (fastify, opts) {
    fastify.get('/:userid', async (req, reply) => {
      const client = await fastify.pg.connect()
      let id = req.params.userid
      id = id.toString()
      id = id.split(':')
      let payload, str, validate

      if(id[0] == 'student_id'){
        payload = {"student_id": id[1]}
        str = fastify.jwt.sign(payload)
        validate = 'SELECT * FROM public.student WHERE id=' + id[1]
      }else if(id[0] == 'instructor_id'){
        payload = {"instructor_id": id[1]}
        str = fastify.jwt.sign(payload)
        validate = 'SELECT * FROM public.instructor WHERE id=' + id[1]
      }

      let validateresult = await client.query(validate)

      if(validateresult.rowCount){
      try {
        reply.code(200).send(str)
      } finally {
        client.release()
      }
      }else{
        try {
          reply.code(404).send('invalid id')
        } finally {
          client.release()
          client.end()
        }
      }
    })
}