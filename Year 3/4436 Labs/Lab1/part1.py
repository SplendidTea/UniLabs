import base64
import ssl
from socket import *

def main():
 msg = '\r\n I love computer networks!'
endmsg = "\r\n.\r\n"

# Choose a mail server (e.g. Google mail server) and call it mailserver mailserver = #Fill in start

#Sets up a mail server and sets the correct port
mailServer= 'smtp.gmail.com'
mailport= 587

# #Fill in end



# Create socket called clientSocket and establish a TCP connection with mailserver

# Fill in start

#Creates a client socket, with the mail server and the mail port
clientSocket = socket(AF_INET, SOCK_STREAM)
clientSocket.connect((mailServer,mailport))

print("Ya Made it") #for debug mostly
# Fill in end

# the next chunk of code first recives a response from the server and checks if we got the right code response back from the server
recv = clientSocket.recv(1024).decode()
print(recv)
if recv[:3] != '220':
    print('220 reply not received from server.')

# Send HELO command and print server response. heloCommand = 'HELO Alice\r\n' clientSocket.send(heloCommand.encode())


#the following sends a EHLO command to the server
ehloCommand = 'EHLO smtp.google.com\r\n'
clientSocket.send(ehloCommand.encode())

# the next chunk of code first recives a response from the server and checks if we got the right code response back from the server
recv1 = clientSocket.recv(1024).decode()
print(recv1)
if recv1[:3] != '250':
    print('250 reply not received from server.')
#Starts an tls encrypted connection
tlsCommand = 'STARTTLS\r\n'
clientSocket.send(tlsCommand.encode())
# the next chunk of code first recives a response from the server and checks if we got the right code response back from the server
recv1 = clientSocket.recv(1024).decode()
print(recv1)
print("Message after STARTTLS command:" + recv1)
if recv1[:3] != '220':
        print('220 reply not received from server.')

#Wraps the connection in an ssl connection
sclientSocket= ssl.wrap_socket(clientSocket, ssl_version=ssl.PROTOCOL_SSLv23)


#gmail requires that you send them a login the next following commands are for login purposes, there also are response checks as well scattered throughout the next bit of code
sclientSocket.send(('auth login\r\n').encode())
# the next chunk of code first recives a response from the server and checks if we got the right code response back from the server
recv1 = sclientSocket.recv(1024).decode()
if recv1[:3] != '334':
        print('334 reply not received from server.')

#the next chunk of code sends a username and password to gmail to  authenticate
sclientSocket.send((base64.b64encode(('usr').encode()))+('\r\n').encode())
recv1 = sclientSocket.recv(1024).decode()
if recv1[:3] != '334':
        print('334 reply not received from server.')
sclientSocket.send((base64.b64encode(('pwd').encode()))+('\r\n').encode()) #for better form I could use an auth token which is required for accounts with 2 factor, but my test account does not have 2 factor
recv1 = sclientSocket.recv(1024).decode()
print(recv1)
if recv1[:3] != '235':
        print('235 reply not received from server.')

# Send MAIL FROM command and print server response.

# Fill in start

#the mail from command
mailfromcommand= 'MAIL FROM: <usr>\r\n'
sclientSocket.send(mailfromcommand.encode())
# the next chunk of code first recives a response from the server and checks if we got the right code response back from the server
recv1=sclientSocket.recv(1024).decode()
print(recv1)
if recv1[:3]!= '250':
    print("mail from 250 not recived")
# Fill in end

# Send RCPT TO command and print server response.

# Fill in start
#the recipient command this is the person recieving the mail
RCPT= 'RCPT TO: <xxx>\r\n'
sclientSocket.send(RCPT.encode())
# the next chunk of code first recives a response from the server and checks if we got the right code response back from the server
recv1= sclientSocket.recv(1024).decode()
print(recv1)
if recv1[:3]!='250':
    print("250 reply not recived from the server")


# Fill in end


# Send DATA command and print server response.

# Fill in start

#sends the data
sclientSocket.send(('DATA\r\n').encode())
# the next chunk of code first recives a response from the server and checks if we got the right code response back from the server
recv1=sclientSocket.recv(1024).decode()
print(recv1)

if recv1[:3]!='354':
    print("354 reply not recived")


# Fill in end


# Send message data.

# Fill in start

# Fill in end

# Message ends with a single period.

# Fill in start

#the next bit of code actually sends the main body of the email
msg= '\r\n I love computer networks!'
sclientSocket.send((msg + endmsg).encode())
# the next chunk of code first recives a response from the server and checks if we got the right code response back from the server
recv1 = sclientSocket.recv(1024).decode()
print(recv1)
if recv1[:3] != '250':
    print('end msg 250 reply not received from server.')

# Fill in end


# Send QUIT command and get server response.

# Fill in start

#quits the server
quit='QUIT\r\n'
sclientSocket.send(('QUIT\r\n').encode())

#tells the server the interaction should be terminated

#closes the client socket and the ssl wrapper
sclientSocket.close() #close the socket
clientSocket.close()
pass

if __name__ == '__main__':
    main()

# Fill in end