#!/bin/bash

#================================================================
#              Extract the complete HTML files
#================================================================

# Get the current parent directory
ARG1=$PWD

# Go to the source directory
cd source_files

# Remove any former folder
rm -rf localhost:4000
rm -rf _site/localhost:4000

# Clean any previous built files
bundle exec jekyll clean

# Create a command list to run the server in a secondary terminal
cat <<EOF > server.command
pwd
cd $ARG1/source_files
bundle exec jekyll serve
EOF

chmod +x server.command; open server.command

# Sleep the process
sleep 10

# Get the local website
wget -m -p -E -k http://localhost:4000

# Access the folder
cd localhost:4000

# Move all files to the parent directory
cp -r * $ARG1

# Remove and clean folder
cd ..
rm server.command

# Clear terminal
cd $ARG1
clear
