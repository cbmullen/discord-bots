#!/bin/bash


# Assign arguments to variables
source_file="configuration/$1"
destination_file=".dev.vars"

# Check if the correct number of arguments are provided
if [ $# -ne 1 ]; then
  echo "Usage: $0 <source_file> <destination_file>"
  exit 1
fi

# Check if the source file exists
if [ ! -f "$source_file" ]; then
  echo "Error: Source file '$source_file' does not exist."
  exit 2
fi

if [ ! -f "$destination_file" ]; then
  echo "Error: Destination file '$destination_file' does not exist."
  exit 2
fi

# Perform the copy operation
cp "$source_file" "$destination_file"

# Check if the copy was successful
if [ $? -eq 0 ]; then
  echo "File '$source_file' successfully copied to '$destination_file'."
else
  echo "Error: Failed to copy '$source_file' to '$destination_file'."
  exit 3
fi
