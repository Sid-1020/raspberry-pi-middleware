#!/usr/bin/python

import socket #import the socket module
import subprocess

s = socket.socket() #Create a socket object
port = 12397 # Reserve a port for your service
s.bind(('',port)) #Bind to the port

s.listen(5) #Wait for the client connection
print "Server started - waiting for connections:"
while True:
    subprocess.call(['./ledOff.sh'])
    c,addr = s.accept() #Establish a connection with the client
    print "Connection received from other Raspberry Pi", addr
    c.send("Message from server - Got it!")
    print c.recv(1024)
    data = c.recv(1024)
    #print data
    if (data == 'yes'):
#        subprocess.call(['./printsomething.sh'])
        subprocess.call(['./ledOn.sh'])
        print 'LED is on!'
    else:
        print 'NO!'
    c.close()
