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

github_pubkey='ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQChBepJUHu7j6bAwbdHhjEfvEPtFqHkjT0H1n7ZvIUA87m9c7fhW+q1a8JDvAd9ucrho/i+v1rz4sv1mfowzk8x8RtMGjLHNIrmPhikACaVKucILnbXaC8yDcyu/1DAbMZcjlUnU7cTZMW6MwpVRriyhgjX914h5FYgimR3Rjs7C8DMBlizoj/nQLYgEpB/9+vemVYwYt9QYG/uSDnl4yTDRWbvp81X/bVQvttFzPKBsPzE728/VfEmtfOyijrIJSDgByjWA+pPTpPq8A8j+xQo539ewZGfTUCfwQ/vFVCZA7CIxriswJvLXYSv/FMrTf1MZAxu5XjibDHPhjDqP43C4NtKP1fNjESzEzVGquptVcGXKCVGilgKAIGJZRikNxPZ4bAXCGt4gZMtUpOV9fPzZJzTv9nw2CRVHpg5O4WoKNadjZPu7Pz24B1C3xusZ6I1Mo54Rs/BwWuxVgfGU4RnLXdiFzvKPFtdFljmcDcJKtVhXV3l1EpQ6f2UXOSpDy2jOsIHgSWOku4zcpIqaoaBlvy83BgqGCgCwb0Z1ukOnqkSFgCzawS3CiFpx8zA0wFehnSND17gNV3Sq7pVPEzflblCxqtLlnU1t6NoGUY7RCRN2aRvI7WfdEhmgP4KGEoi+UbuuDtKgKyJcP2xiLJ70pTcrkqFWy7Das2iSLwjpQ== tarteel.ghassan1@gmail.com'

sudo -u github sh -c "mkdir -p /home/app/.ssh && echo $github_pubkey > /home/app/.ssh/authorized_keys"

sudo reboot