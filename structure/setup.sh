#!/bin/sh
set -e

sudo apt update
sudo apt upgrade -y

sudo apt-get install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings

# install docker
for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do sudo apt-get remove $pkg; done

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
# Add the repository to Apt sources:
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update

sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# create github user
sudo mkdir -p /home/app
sudo useradd --no-create-home --home-dir /home/app --shell /bin/bash github
sudo usermod --append --groups docker github
sudo usermod --append --groups docker ubuntu
sudo chown github:github -R /home/app

github_pubkey='ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDMd4fhhnGWva4nej70fq3dW0/Jb8W7pftxQpoVXjw3b0Fci3XgJe8oHQwkYTSPXniZJHjl7y7i2+dxeNs+KP4nzL5FiYUg7kbV76lD8BA1TWe0uoE7QtPceygOa8aqQBQosY2Vu761pCoH6waLcCUpd2IXet1FrZhTXcru99kYjDn9NeQwyzZkZn0bJe/hLO86L03vw/kZ4pb9CDgblqT43WgCu6akfFfdp56l/KBNTYPAUram57nMdA6YcIum4999IFUCZUp99hJmFVivG24zZspHozDL8Nv7+/BMkMEgi1vIBP6U0/E9W3xpkSRxjrftbPIbUTWqyNu7mx8iyUob9dpkffm1OSzchD+TLrzxhvd1ePXfnJZpic/H9jJYpsxC0/1T5OIY3UBfd6cZH3As3Gtn2JN54Uuvjlyn4kE7Lz2WgRMerJmZVAN5xsmWBt5cW4thnk/rYErXhXbpNX/rWLmriAdf18zYDd0lJLTkgdpxPK9IJRHifoDkK3oK4A+vmyUU3atrRAw5FIik6/hAzliYEqDc072QKpbJRlZT+gd32IjzV5vM2YS9v6uv5oQus+6cwPRxvMUkn1H0mALAisrWkOJAvFXDRMlqdi0MlhhTzURr1MoO+eG+cYQey/RGCN7cvkd3z9lsKkYfvXU9jTZQ74xG2i0q1WZoyySxzw== tarteel.ghassan1@gmail.com'

sudo -u github sh -c "mkdir -p /home/app/.ssh && echo $github_pubkey > /home/app/.ssh/authorized_keys"

sudo reboot