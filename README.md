personalblog
============

Live Version: www.ericshi.ca

This is my personal djangoblog. I am still learning and will be constantly updating this blog. Please feel free to branch and contribute.

For anyone who would like to set up a local version.

I'm using

Python 2.7

Installation instructions
sudo apt-get install build-essential
sudo apt-get install libreadline-gplv2-dev libncursesw5-dev libssl-dev libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev
cd ~/<folder to tar>/
wget http://python.org/ftp/python/2.7.5/Python-2.7.5.tgz
tar -xvf Python-2.7.5.tgz
cd Python-2.7.5
./configure
make
sudo make install

Install pip
sudo apt-get install python-pip

Install virtualenv
sudo pip install virtualenv

Go to the project root folder and run
sudo pip install virtualenv
To install dependencies. 

Please note pg_config for postGRE will fail, I'm using SQLite locally and I have postGRE on my hosting server. 

Work in progress. 
