# Fotozi

### Setup

se não quiser-mso utilizar a função da envio de email basta o seguinte comando:

nodemon || node index.js

### setup com email só funciona com gmail

set (windows) || export (osx)

exemplo de como definir o mail da aplicação no windows:
set photosApp_mail="somemail@gmail.com"

exemplo de como definir a password (windows) correspondente ao email que definimos anteriormente:
set photosApp_mailPassword='emaiPassword'

Depos basta correr o comando nodemon ou node index.js
Se o email ou a password ou ambos não estiver definido, vai aparecer uma mensagem na consola a dizer:

- App amil undefined, cannot use send mail functionality!
- Password for the app mail undefined, cannot use send mail functionality!

Se ambos estiverem definidos não aparecerá mensagem nenhuma.

### NOTAS ADICIONAIS:

Para usar um emal do Gmail e preciso ir ás definições de segurança do Google e ativar o acesso a aplicação menos seguras
