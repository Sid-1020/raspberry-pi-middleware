#!/usr/bin/python
# tcp client
import socket #import socket module

s = socket.socket() #create a socket object
host = '128.208.57.231' #Host i.p
port = 12397 #port for service

s.connect((host,port))
print s.recv(1024)
s.send('yes')
s.close
