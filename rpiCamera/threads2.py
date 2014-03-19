
#!/usr/bin/python

import time
import socket #import the socket module
import subprocess
import os
import cv

import threading
from threading import Thread

def func1():
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
def func2():
	storage = cv.CreateMemStorage()
	haar = cv.Load('/usr/share/opencv/haarcascades/haarcascade_frontalface_default.xml')

	filename = "capture.jpg"

	while (True):
		print "capturing image"
		start = time.time()
		os.system("/opt/vc/bin/raspistill -rot 180 -w 800 -h 600 -t 10 -o " + filename)
		end = time.time()
		print "captured image in " + str(end-start) + " seconds"

		print "processing image"
		start = time.time()
		image = cv.LoadImage(filename)
		detected = cv.HaarDetectObjects(image, haar, storage, 1.2, 2, cv.CV_HAAR_DO_CANNY_PRUNING, (100,100))
		end = time.time()
		print "processed image in " + str(end-start) + " seconds"

		if detected:
			print "detected face"
			print "sending message to other Raspberry Pi"
    
			s = socket.socket() #create a socket object
			host = '10.0.0.8' #Host i.p
			port = 12398 #Reserve a port for your service

			s.connect((host,port))
			print s.recv(1024),host
			s.close

			for face in detected:
				print face
				s.send(str('face detected!'))
				s.send(str('yes'))
			s.close  
		else:
			print "no face"

if __name__ == '__main__':
    Thread(target = func1).start()
    Thread(target = func2).start()
