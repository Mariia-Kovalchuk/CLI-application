Скриншоты выполнения команд

Запусти команды в терминале и сделай отдельный скриншот результата выполнения каждой команды.

# Получаем и выводим весь список контактов в виде таблицы (console.table)

node index.js --action list
https://monosnap.com/file/QJ0IHTvyVYlinJBqqR6iAWcHGC8WsR

# Получаем контакт по id

node index.js --action get --id 5
https://monosnap.com/file/cuyUispPZEhpUdCDMUnccMZGwU9sDT

# Добавялем контакт

node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22
https://monosnap.com/file/c3goGXyvgDIajnWakekWqCq83VKKCn

# Удаляем контакт

node index.js --action remove --id=3
https://monosnap.com/file/6xvGQYwFnqWDAEdZcKqcuMdpeAWXqb
