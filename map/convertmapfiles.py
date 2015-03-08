import os
import re

for filename in os.listdir(os.getcwd() + '/mapfiles/'):
	if ".tmx" in filename:

		newfile = open('mapfiles/' + filename.replace(".tmx", ".xml"), 'a')

		file = open('mapfiles/' + filename, 'r')

		for line in file:
			if "../../assets" in line:
				print "Before sub"
				print line

				print "After sub"

				line = line.replace('../../assets', 'assets')

				print line

			newfile.write(line)

		file.close()