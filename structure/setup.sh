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

github_pubkey='ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDMBJuY0SMakqbASkZ9jHgxKVf/Yc7yQpSMINq4UZsG1rKaP9Wh8dc5tp0abQHaYypPhVaoOJ6wRhFbP6eHZbXt2jxr/5CCRCgjZtgAmo7wVSynbzMamAV8GeQRndOX0DcCJFna0bZ0LhdvUGezAW/KbjnLKuZjFwmOingncVTKCbrZ1qM9soCJG8DcpocGzUDMaZIw40t9zKUdlSgFk3pPY/MEWkL1tjVheONjBHhqZSVGUTsLbHTJszgBN1mhnOFu9Lw52owbluZfoU5nbcgG6yA607iBWHQnqZbFPEtRcwKrfP8CdI5f/CUH8SuspJQ+YJuRNJxVPcviIIJa66ysEO6ejmsyolFWgvTShriMNszCFmGEtV2R4aOekJ4KmotcsD/+gUd+9xgXQAFdw8jNPTYMiOev6fEk2+4scwnyKGXkU6FZxRDxxq5GW3q3vVuuECWCI+8bsyj52AZkR+xMRFYAl7oP+NGmSrolH/R76l1HmS/u+aLn+2W1nY44yzJvAz+izaNwCXeQ6A8fvUOiXjmU3xTKB4IT4RuwK5OzuIURK+C6mpZBkNqwIO79AzsirZnxBfsaUo1Mc628lT2RxWwt8EBPB7DDEicb1Df4WkSa56NsPabYydU8X+tvtKF9PNZeVl0IxbG996df0JyeVEkIhMOh6E11PN10AMj2Zw== soghayyeraya@gmail.com'

sudo -u github sh -c "mkdir -p /home/app/.ssh && echo $github_pubkey > /home/app/.ssh/authorized_keys"

sudo reboot