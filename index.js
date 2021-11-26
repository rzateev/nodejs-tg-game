require('dotenv').config()
const TelegramApi = require('node-telegram-bot-api')
const {gameOptions} = require('./options')
const token = process.env.TOKEN
const bot =  new TelegramApi(token,{polling: true})

const chats = []

const start= ()=> {
    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Получить инфо о пользователе'},
        {command: '/game', description: 'Игра угадай цифру'}
    ])

    bot.on('message', async (msg) =>{
        const text = msg.text
        const chatId = msg.chat.id

        if (text === '/start') {
            await bot.sendSticker(chatId,'https://tlgrm.ru/_/stickers/9df/619/9df6199a-ff6a-338d-9f74-625b0a647045/1.jpg')
            return  bot.sendMessage(chatId, `Добро пожаловать`)
        }

        if (text === '/info') {
            console.log(msg.from);
            await bot.sendMessage(chatId, `Тебя зовут ${msg.from}`)
            return  bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.name}`)
        }

        if (text === '/game') {
            await  bot.sendMessage(chatId, `Сейчас я загадаю цифру от 0 до 9, а ты должен отгадать ее`)
            const randomNumber = Math.floor(Math.random()*10)
            chats[chatId] = randomNumber
            return bot.sendMessage(chatId, `Отгадай число`,gameOptions)
        }

        return bot.sendMessage(chatId,"Я тебя не понимаю, попробуй еще раз!")
        //console.log(msg)
    } )

    bot.on('callback_query', async(msg) =>{
        const data = msg.data
        const chatId = msg.message.chat.id;
        await bot.sendMessage(chatId, `Ты выбрал число ${data}`)

        if (chats[chatId] == data) {
            bot.sendMessage(chatId, `Ты угадал! ${data}`)
        } else {
            if (chats[chatId] > data) {
            await bot.sendMessage(chatId, 'Число должно быть больше!!!')
            } else {
                await bot.sendMessage(chatId, 'Число должно быть меньше!!!')
            }

            return bot.sendMessage(chatId, `Попробуй еще раз!`,gameOptions)
        }

        console.log(msg)
    })
}

start()
