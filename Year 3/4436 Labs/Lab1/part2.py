import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from socket import *
from smtplib import*
def task2():

    msg = "\r\n I love computer networks!"
endmsg = "\r\n.\r\n"


# Choose a mail server (e.g. Google mail server) and call it mailserver mailserver = #Fill in start
msg = MIMEMultipart()
msg['From'] = 'xxxx'
msg['To'] = 'xxxx'
msg['Subject'] = 'Task 2 for 4436'
message = '\r\n I love computer networks'
msg.attach(MIMEText(message))

# Choose a mail server (e.g. Google mail server) and call it mailserver mailserver = #Fill in start
#Mail Server Creation
smtp=smtplib.SMTP('smtp.gmail.com',587)
# #Fill in end

# Send HELO command and print server response. heloCommand = 'HELO Alice\r\n' clientSocket.send(heloCommand.encode())
#Telling Mail Server Hello
smtp.ehlo()

#Starting an Encrypted connection with the mail server
smtp.starttls()

#Resending hello to the mailserver via the encrypted connection
smtp.ehlo()

# Send MAIL FROM command and print server response.

# Fill in start
#Login to mail sever
smtp.login('xxx', '###')

# Fill in end

# Send DATA command and print server response.

# Fill in start
#send mail to mailserver
smtp.sendmail('xxxx','xxxx', msg.as_string())
print('mail sent')

# Fill in end

# Send QUIT command and get server response.

# Fill in start
#ends the connection to the mail server
smtp.quit()



if __name__ == '__task2__':
    task2()
# Fill in end