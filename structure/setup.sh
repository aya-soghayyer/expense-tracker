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

github_pubkey='ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCj1xYESHCaQRq3p4mYTHVgD+UXIaPXLzOaiKOEBwpyliMt9hD6myzzVLWAkGniOu8HmP9cMIvDgbpRq9WBg+ozPuuOvyw7y3FpFEld0BhEapcu4O0TOVaX4fBIhVcxarmkjqNftNrymcrGoPXo4TVMv2LDc7hF2h0I5NplwLKSadNk+TswD7jMNBF/ubHMsHOOTUyw9+25gMxDF+RVulPWhinX/NzUHHDK8sZmXZR3Qnve0gjBWElptj4HQD7fpUQKHzh+P3gy38krZJhryh1clh1l116Y1plpmWQ5dEX6AwVyt7cLDGkTNUgnc0hE56LIx67yNSRWJHePRQL5o6D+hiCxi5HgyuJXyjEprhORzjQgfm21LSLGFdeXzIVdGhPu2LamkeHWmsoKDxSwFUULLCZN5ajaipHmoZoHoVTlghujKoIBGQeiPmOwjNhBR8QZmJzxGvnvLg2zfGlg1lzVlDkXjoT9hTjqLf1KUDYa5kUoS/ySeyruyVl5D6WHE/s= tarteel@DESKTOP-KFN2M1U'

sudo -u github sh -c "mkdir -p /home/app/.ssh && echo $github_pubkey > /home/app/.ssh/authorized_keys"

sudo reboot