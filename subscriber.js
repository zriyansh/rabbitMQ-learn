const amqp = require('amqplib/callback_api');

amqp.connect(`amqp://localhost`, (err, connection) => {
    if(err){
        throw err;
    }
    connection.createChannel((err, channel) => {
        if(err){
            throw err;
        }
        let queueName = "priyansh";
        channel.assertQueue(queueName, {
            durable: false  // if true, queue will be deleted if there are no subscribers
        })
        channel.consume(queueName, (msg) =>{
            console.log(`Recieved: ${msg.content.toString()}`)
            channel.ack(msg)
        })
    })
})
