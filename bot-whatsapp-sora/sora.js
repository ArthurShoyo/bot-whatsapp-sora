const qrcode = require('qrcode-terminal');
const fs = require('fs');
const mime = require('mime-types');
const { Client, MessageMedia, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth
});

function showTime () {
    var time = new Date();
    var hours = time.getHours();
    var minutes = time.getMinutes()
    var seconds = time.getSeconds()

    if (hours<10) hours = "0"+hours;
    if (minutes<10) minutes = "0"+minutes;
    if (seconds<10) seconds = "0"+seconds;

    var tempo = hours+":"+minutes+":"+seconds;
    return tempo
}
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();


 
client.on('message', async message => {
    //Stickers
	if(message.body === '/s'){
        if(message.hasMedia){
            message.react('🖐🏻')
            message.downloadMedia().then(media => {

                if (media) {
    
                    const mediaPath = './downloaded-media/';
    
                    if (!fs.existsSync(mediaPath)) {
                        fs.mkdirSync(mediaPath);
                    }
    
    
                    const extension = mime.extension(media.mimetype);
    
                    const filename = new Date().getTime();
    
                    const fullFilename = mediaPath + filename + '.' + extension;
    
                    // Save to file
                    try {
                        fs.writeFileSync(fullFilename, media.data, { encoding: 'base64' });
                        console.log('File downloaded successfully!', fullFilename);
                        console.log(fullFilename);
                        MessageMedia.fromFilePath(filePath = fullFilename)
                        client.sendMessage(message.from, new MessageMedia(media.mimetype, media.data, filename), { sendMediaAsSticker: true,stickerAuthor:"ArthurShoyo",stickerName:"Bot Sora"} )
                        fs.unlinkSync(fullFilename)
                        console.log(`File Deleted successfully!`,);
                        message.react('👍🏻')
                    } catch (err) {
                        console.log('Failed to save the file:', err);
                        console.log(`File Deleted successfully!`,);
                    }
                }
            
            });
        }else{
            message.reply(`Necessita de uma IMAGEM para ativação desse comando`)
        }

    } else if (message.body === '/info') {
        message.react('🖐🏻')
        message.reply('*Meu nome:* Sora\n*Feito por:* ArthurShoyo\n*Data de nascimento:* 12/11/2022\n*Comandos* (/s: Faz a imagem virar um sticker,\n/info: informações sobre mim\n)*Time:*'+showTime())
    } else if (message.body === '/grupoinfo') {
        message.react('🖐🏻')
        let chat = await message.getChat();
        if (chat.isGroup) {
            message.reply(` 
            Nome: ${chat.name}
            Descrição: ${chat.description}
            Criado: ${chat.createdAt.toString()}
            ` );
            message.react('👍🏻')
        }
        else {
            message.reply('Esse comando é usado apenas para grupo')
        }


    } else if (message.body === '/menu') {
        const nome = await client.getContacts()
        console.log(message.getInfo().then)
    } else if (message.body === '/saudacao') {
        let chat = await message.getChat();
        if (chat.isGroup) {
            
            message.reply('Esse comando é usado apenas no privado')
        }
        else {  
            const contact = await message.getContact();
            chat.sendMessage(`Oiii ${contact.pushname}`);
        }
    } else if (message.body == 'que nivel gay foi isso?') {
        const gay = parseInt(Math.random() * 100)
        if (gay > 66) {
            message.reply(`Foi gay nivel joão`)
        }
        else if (gay > 33 && gay < 66) {
            message.reply('Foi gay nivel luan')
        }
        else if (gay < 33) {
            message.reply('Foi gay nivel Arthur')
        }
        
    
    } else if (message.body === '/qm') { 
        const gay = parseInt(Math.random() * 100)
        if (gay > 66) {
            message.reply(`João`)
        }
        else if (gay > 33 && gay < 66) {
            message.reply('Luan')
        }
        else if (gay < 33) {
            message.reply('Arthur')
        }
        
    }

})