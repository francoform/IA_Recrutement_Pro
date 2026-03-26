Starting deployment of francoform/IA_Recrutement_Pro:main to localhost.
2025-Nov-22 17:56:41.182188
Preparing container with helper image: ghcr.io/coollabsio/coolify-helper:1.0.12
2025-Nov-22 17:56:41.519185
[CMD]: docker stop --time=30 do4s4s44wc84kks0kg8w0k0c
2025-Nov-22 17:56:41.519185
Error response from daemon: No such container: do4s4s44wc84kks0kg8w0k0c
2025-Nov-22 17:56:41.913397
[CMD]: docker rm -f do4s4s44wc84kks0kg8w0k0c
2025-Nov-22 17:56:41.913397
Error response from daemon: No such container: do4s4s44wc84kks0kg8w0k0c
2025-Nov-22 17:56:42.381995
[CMD]: docker run -d --network coolify --name do4s4s44wc84kks0kg8w0k0c  --rm -v /var/run/docker.sock:/var/run/docker.sock ghcr.io/coollabsio/coolify-helper:1.0.12
2025-Nov-22 17:56:42.381995
6649ba92c9717362cbc94c6eec1a4f45bf80c48ca0da77709de29b1ebefa1044
2025-Nov-22 17:56:44.799427
[CMD]: docker exec do4s4s44wc84kks0kg8w0k0c bash -c 'GIT_SSH_COMMAND="ssh -o ConnectTimeout=30 -p 22 -o Port=22 -o LogLevel=ERROR -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" git ls-remote https://x-access-token:<REDACTED>@github.com/francoform/IA_Recrutement_Pro.git refs/heads/main'
2025-Nov-22 17:56:44.799427
391a9555b7c48e0556bbe264bdeceb951533de9c	refs/heads/main
2025-Nov-22 17:56:45.158744
Image not found (ygcggosc4k4wg04ck8k08w8s:391a9555b7c48e0556bbe264bdeceb951533de9c). Building new image.
2025-Nov-22 17:56:45.431845
----------------------------------------
2025-Nov-22 17:56:45.448368
Importing francoform/IA_Recrutement_Pro:main (commit sha 391a9555b7c48e0556bbe264bdeceb951533de9c) to /artifacts/do4s4s44wc84kks0kg8w0k0c.
2025-Nov-22 17:56:45.876327
[CMD]: docker exec do4s4s44wc84kks0kg8w0k0c bash -c 'git clone --depth=1 --recurse-submodules --shallow-submodules -b 'main' 'https://x-access-token:<REDACTED>@github.com/francoform/IA_Recrutement_Pro.git' '/artifacts/do4s4s44wc84kks0kg8w0k0c' && cd '/artifacts/do4s4s44wc84kks0kg8w0k0c' && if [ -f .gitmodules ]; then git submodule sync && GIT_SSH_COMMAND="ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" git submodule update --init --recursive --depth=1; fi && cd '/artifacts/do4s4s44wc84kks0kg8w0k0c' && GIT_SSH_COMMAND="ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" git lfs pull'
2025-Nov-22 17:56:45.876327
Cloning into '/artifacts/do4s4s44wc84kks0kg8w0k0c'...
2025-Nov-22 17:56:47.714353
[CMD]: docker exec do4s4s44wc84kks0kg8w0k0c bash -c 'cd /artifacts/do4s4s44wc84kks0kg8w0k0c && git log -1 391a9555b7c48e0556bbe264bdeceb951533de9c --pretty=%B'
2025-Nov-22 17:56:47.714353
Fix: correction bug
2025-Nov-22 17:56:48.152040
Generating nixpacks configuration with: nixpacks plan -f json --env SOURCE_COMMIT=391a9555b7c48e0556bbe264bdeceb951533de9c --env COOLIFY_URL=https://ia-recrutement-pro.be2web.fr --env COOLIFY_FQDN=ia-recrutement-pro.be2web.fr --env COOLIFY_BRANCH=main --env COOLIFY_RESOURCE_UUID=ygcggosc4k4wg04ck8k08w8s --env COOLIFY_CONTAINER_NAME=ygcggosc4k4wg04ck8k08w8s-175638146354 /artifacts/do4s4s44wc84kks0kg8w0k0c
2025-Nov-22 17:56:48.603899
[CMD]: docker exec do4s4s44wc84kks0kg8w0k0c bash -c 'nixpacks plan -f json --env SOURCE_COMMIT=391a9555b7c48e0556bbe264bdeceb951533de9c --env COOLIFY_URL=https://ia-recrutement-pro.be2web.fr --env COOLIFY_FQDN=ia-recrutement-pro.be2web.fr --env COOLIFY_BRANCH=main --env COOLIFY_RESOURCE_UUID=ygcggosc4k4wg04ck8k08w8s --env COOLIFY_CONTAINER_NAME=ygcggosc4k4wg04ck8k08w8s-175638146354 /artifacts/do4s4s44wc84kks0kg8w0k0c'
2025-Nov-22 17:56:48.603899
{
2025-Nov-22 17:56:48.603899
"providers": [],
2025-Nov-22 17:56:48.603899
"buildImage": "ghcr.io/railwayapp/nixpacks:ubuntu-1745885067",
2025-Nov-22 17:56:48.603899
"variables": {
2025-Nov-22 17:56:48.603899
"CI": "true",
2025-Nov-22 17:56:48.603899
"COOLIFY_BRANCH": "main",
2025-Nov-22 17:56:48.603899
"COOLIFY_CONTAINER_NAME": "ygcggosc4k4wg04ck8k08w8s-175638146354",
2025-Nov-22 17:56:48.603899
"COOLIFY_FQDN": "ia-recrutement-pro.be2web.fr",
2025-Nov-22 17:56:48.603899
"COOLIFY_RESOURCE_UUID": "ygcggosc4k4wg04ck8k08w8s",
2025-Nov-22 17:56:48.603899
"COOLIFY_URL": "https://ia-recrutement-pro.be2web.fr",
2025-Nov-22 17:56:48.603899
"NIXPACKS_METADATA": "node",
2025-Nov-22 17:56:48.603899
"NODE_ENV": "production",
2025-Nov-22 17:56:48.603899
"NPM_CONFIG_PRODUCTION": "false",
2025-Nov-22 17:56:48.603899
"SOURCE_COMMIT": "391a9555b7c48e0556bbe264bdeceb951533de9c"
2025-Nov-22 17:56:48.603899
},
2025-Nov-22 17:56:48.603899
"phases": {
2025-Nov-22 17:56:48.603899
"build": {
2025-Nov-22 17:56:48.603899
"dependsOn": [
2025-Nov-22 17:56:48.603899
"install"
2025-Nov-22 17:56:48.603899
],
2025-Nov-22 17:56:48.603899
"cmds": [
2025-Nov-22 17:56:48.603899
"yarn run build"
2025-Nov-22 17:56:48.603899
],
2025-Nov-22 17:56:48.603899
"cacheDirectories": [
2025-Nov-22 17:56:48.603899
".next/cache",
2025-Nov-22 17:56:48.603899
"node_modules/.cache"
2025-Nov-22 17:56:48.603899
]
2025-Nov-22 17:56:48.603899
},
2025-Nov-22 17:56:48.603899
"install": {
2025-Nov-22 17:56:48.603899
"dependsOn": [
2025-Nov-22 17:56:48.603899
"setup"
2025-Nov-22 17:56:48.603899
],
2025-Nov-22 17:56:48.603899
"cmds": [
2025-Nov-22 17:56:48.603899
"yarn install --frozen-lockfile"
2025-Nov-22 17:56:48.603899
],
2025-Nov-22 17:56:48.603899
"cacheDirectories": [
2025-Nov-22 17:56:48.603899
"/usr/local/share/.cache/yarn/v6"
2025-Nov-22 17:56:48.603899
],
2025-Nov-22 17:56:48.603899
"paths": [
2025-Nov-22 17:56:48.603899
"/app/node_modules/.bin"
2025-Nov-22 17:56:48.603899
]
2025-Nov-22 17:56:48.603899
},
2025-Nov-22 17:56:48.603899
"setup": {
2025-Nov-22 17:56:48.603899
"nixPkgs": [
2025-Nov-22 17:56:48.603899
"nodejs_24",
2025-Nov-22 17:56:48.603899
"yarn-1_x"
2025-Nov-22 17:56:48.603899
],
2025-Nov-22 17:56:48.603899
"nixLibs": [
2025-Nov-22 17:56:48.603899
"gcc-unwrapped"
2025-Nov-22 17:56:48.603899
],
2025-Nov-22 17:56:48.603899
"nixOverlays": [
2025-Nov-22 17:56:48.603899
"https://github.com/railwayapp/nix-npm-overlay/archive/main.tar.gz"
2025-Nov-22 17:56:48.603899
],
2025-Nov-22 17:56:48.603899
"nixpkgsArchive": "23f9169c4ccce521379e602cc82ed873a1f1b52b"
2025-Nov-22 17:56:48.603899
}
2025-Nov-22 17:56:48.603899
},
2025-Nov-22 17:56:48.603899
"start": {
2025-Nov-22 17:56:48.603899
"cmd": "yarn run start"
2025-Nov-22 17:56:48.603899
}
2025-Nov-22 17:56:48.603899
}
2025-Nov-22 17:56:49.043443
[CMD]: docker exec do4s4s44wc84kks0kg8w0k0c bash -c 'nixpacks detect /artifacts/do4s4s44wc84kks0kg8w0k0c'
2025-Nov-22 17:56:49.043443
node
2025-Nov-22 17:56:49.061161
Found application type: node.
2025-Nov-22 17:56:49.077336
If you need further customization, please check the documentation of Nixpacks: https://nixpacks.com/docs/providers/node
2025-Nov-22 17:56:49.139789
----------------------------------------
2025-Nov-22 17:56:49.157209
⚠️ NIXPACKS_NODE_VERSION not set. Nixpacks will use Node.js 18 by default, which is EOL.
2025-Nov-22 17:56:49.172095
You can override this by setting NIXPACKS_NODE_VERSION=22 in your environment variables.
2025-Nov-22 17:56:49.184187
Final Nixpacks plan: {
2025-Nov-22 17:56:49.184187
"providers": [],
2025-Nov-22 17:56:49.184187
"buildImage": "ghcr.io\/railwayapp\/nixpacks:ubuntu-1745885067",
2025-Nov-22 17:56:49.184187
"variables": {
2025-Nov-22 17:56:49.184187
"CI": "true",
2025-Nov-22 17:56:49.184187
"COOLIFY_BRANCH": "main",
2025-Nov-22 17:56:49.184187
"COOLIFY_CONTAINER_NAME": "ygcggosc4k4wg04ck8k08w8s-175638146354",
2025-Nov-22 17:56:49.184187
"COOLIFY_FQDN": "ia-recrutement-pro.be2web.fr",
2025-Nov-22 17:56:49.184187
"COOLIFY_RESOURCE_UUID": "ygcggosc4k4wg04ck8k08w8s",
2025-Nov-22 17:56:49.184187
"COOLIFY_URL": "https:\/\/ia-recrutement-pro.be2web.fr",
2025-Nov-22 17:56:49.184187
"NIXPACKS_METADATA": "node",
2025-Nov-22 17:56:49.184187
"NODE_ENV": "production",
2025-Nov-22 17:56:49.184187
"NPM_CONFIG_PRODUCTION": "false",
2025-Nov-22 17:56:49.184187
"SOURCE_COMMIT": "391a9555b7c48e0556bbe264bdeceb951533de9c",
2025-Nov-22 17:56:49.184187
"NEXT_PUBLIC_BASE_URL": "https:\/\/ia-recrutement-pro.be2web.fr\/",
2025-Nov-22 17:56:49.184187
"NEXT_PUBLIC_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxZHR0bmFnZHpuZGxwdmRhcnlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3ODYzNjUsImV4cCI6MjA3MTM2MjM2NX0.HEmw-EWietIVX5uKpSCpEGZ4YPS4odLkg2O9gJN13TY",
2025-Nov-22 17:56:49.184187
"NEXT_PUBLIC_SUPABASE_URL": "https:\/\/lqdttnagdzndlpvdaryj.supabase.co",
2025-Nov-22 17:56:49.184187
"NEXTAUTH_SECRET": "8k9mN2pQ7rS4tU6vW8xY0zA1bC3dE5fG7hI9jK2lM4nO6pQ8rS0tU2vW4xY6zA8bC0dE2fG4hI6jK8lM0nO2pQ4rS6tU8vW0xY2zA4bC6dE8fG0hI2jK4lM6nO8pQ0rS2tU4vW6xY8zA0bC2dE4fG6hI8jK0lM2nO4pQ6rS8tU0vW2xY4zA6bC8dE0fG2hI4jK6lM8nO0pQ2rS4tU6vW8xY0zA2bC4dE6fG8hI0jK2lM4nO6pQ8rS0tU2vW4xY6zA8bC0dE2fG4hI6jK8lM0nO2pQ4rS6tU8vW0xY2zA4",
2025-Nov-22 17:56:49.184187
"NEXTAUTH_URL": "https:\/\/ia-recrutement-pro.be2web.fr",
2025-Nov-22 17:56:49.184187
"SMTP_PASSWORD": "Maxime%9524",
2025-Nov-22 17:56:49.184187
"SMTP_SECURE": "true",
2025-Nov-22 17:56:49.184187
"SUPABASE_SERVICE_ROLE_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxZHR0bmFnZHpuZGxwdmRhcnlqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTc4NjM2NSwiZXhwIjoyMDcxMzYyMzY1fQ.lEOLH0N71wO6OX9QS7WfUh4q5aGVdkYBk3weiYv5ue8"
2025-Nov-22 17:56:49.184187
},
2025-Nov-22 17:56:49.184187
"phases": {
2025-Nov-22 17:56:49.184187
"build": {
2025-Nov-22 17:56:49.184187
"dependsOn": [
2025-Nov-22 17:56:49.184187
"install"
2025-Nov-22 17:56:49.184187
],
2025-Nov-22 17:56:49.184187
"cmds": [
2025-Nov-22 17:56:49.184187
"yarn run build"
2025-Nov-22 17:56:49.184187
],
2025-Nov-22 17:56:49.184187
"cacheDirectories": [
2025-Nov-22 17:56:49.184187
".next\/cache",
2025-Nov-22 17:56:49.184187
"node_modules\/.cache"
2025-Nov-22 17:56:49.184187
]
2025-Nov-22 17:56:49.184187
},
2025-Nov-22 17:56:49.184187
"install": {
2025-Nov-22 17:56:49.184187
"dependsOn": [
2025-Nov-22 17:56:49.184187
"setup"
2025-Nov-22 17:56:49.184187
],
2025-Nov-22 17:56:49.184187
"cmds": [
2025-Nov-22 17:56:49.184187
"yarn install --frozen-lockfile"
2025-Nov-22 17:56:49.184187
],
2025-Nov-22 17:56:49.184187
"cacheDirectories": [
2025-Nov-22 17:56:49.184187
"\/usr\/local\/share\/.cache\/yarn\/v6"
2025-Nov-22 17:56:49.184187
],
2025-Nov-22 17:56:49.184187
"paths": [
2025-Nov-22 17:56:49.184187
"\/app\/node_modules\/.bin"
2025-Nov-22 17:56:49.184187
]
2025-Nov-22 17:56:49.184187
},
2025-Nov-22 17:56:49.184187
"setup": {
2025-Nov-22 17:56:49.184187
"nixPkgs": [
2025-Nov-22 17:56:49.184187
"nodejs_24",
2025-Nov-22 17:56:49.184187
"yarn-1_x"
2025-Nov-22 17:56:49.184187
],
2025-Nov-22 17:56:49.184187
"nixLibs": [
2025-Nov-22 17:56:49.184187
"gcc-unwrapped"
2025-Nov-22 17:56:49.184187
],
2025-Nov-22 17:56:49.184187
"nixOverlays": [
2025-Nov-22 17:56:49.184187
"https:\/\/github.com\/railwayapp\/nix-npm-overlay\/archive\/main.tar.gz"
2025-Nov-22 17:56:49.184187
],
2025-Nov-22 17:56:49.184187
"nixpkgsArchive": "23f9169c4ccce521379e602cc82ed873a1f1b52b",
2025-Nov-22 17:56:49.184187
"aptPkgs": [
2025-Nov-22 17:56:49.184187
"curl",
2025-Nov-22 17:56:49.184187
"wget"
2025-Nov-22 17:56:49.184187
]
2025-Nov-22 17:56:49.184187
}
2025-Nov-22 17:56:49.184187
},
2025-Nov-22 17:56:49.184187
"start": {
2025-Nov-22 17:56:49.184187
"cmd": "yarn run start"
2025-Nov-22 17:56:49.184187
}
2025-Nov-22 17:56:49.184187
}
2025-Nov-22 17:56:50.437750
Creating build-time .env file in /artifacts (outside Docker context).
2025-Nov-22 17:56:51.348082
[CMD]: docker exec do4s4s44wc84kks0kg8w0k0c bash -c 'cat /artifacts/build-time.env'
2025-Nov-22 17:56:51.348082
SOURCE_COMMIT='391a9555b7c48e0556bbe264bdeceb951533de9c'
2025-Nov-22 17:56:51.348082
COOLIFY_URL='https://ia-recrutement-pro.be2web.fr'
2025-Nov-22 17:56:51.348082
COOLIFY_FQDN='ia-recrutement-pro.be2web.fr'
2025-Nov-22 17:56:51.348082
COOLIFY_BRANCH='main'
2025-Nov-22 17:56:51.348082
COOLIFY_RESOURCE_UUID='ygcggosc4k4wg04ck8k08w8s'
2025-Nov-22 17:56:51.348082
COOLIFY_CONTAINER_NAME='ygcggosc4k4wg04ck8k08w8s-175638146354'
2025-Nov-22 17:56:51.348082
NEXT_PUBLIC_BASE_URL="https://ia-recrutement-pro.be2web.fr/"
2025-Nov-22 17:56:51.348082
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxZHR0bmFnZHpuZGxwdmRhcnlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3ODYzNjUsImV4cCI6MjA3MTM2MjM2NX0.HEmw-EWietIVX5uKpSCpEGZ4YPS4odLkg2O9gJN13TY"
2025-Nov-22 17:56:51.348082
NEXT_PUBLIC_SUPABASE_URL="https://lqdttnagdzndlpvdaryj.supabase.co"
2025-Nov-22 17:56:51.348082
NEXTAUTH_SECRET="8k9mN2pQ7rS4tU6vW8xY0zA1bC3dE5fG7hI9jK2lM4nO6pQ8rS0tU2vW4xY6zA8bC0dE2fG4hI6jK8lM0nO2pQ4rS6tU8vW0xY2zA4bC6dE8fG0hI2jK4lM6nO8pQ0rS2tU4vW6xY8zA0bC2dE4fG6hI8jK0lM2nO4pQ6rS8tU0vW2xY4zA6bC8dE0fG2hI4jK6lM8nO0pQ2rS4tU6vW8xY0zA2bC4dE6fG8hI0jK2lM4nO6pQ8rS0tU2vW4xY6zA8bC0dE2fG4hI6jK8lM0nO2pQ4rS6tU8vW0xY2zA4"
2025-Nov-22 17:56:51.348082
NEXTAUTH_URL="https://ia-recrutement-pro.be2web.fr"
2025-Nov-22 17:56:51.348082
NODE_ENV="production"
2025-Nov-22 17:56:51.348082
SMTP_PASSWORD="Maxime%9524"
2025-Nov-22 17:56:51.348082
SMTP_SECURE="true"
2025-Nov-22 17:56:51.348082
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxZHR0bmFnZHpuZGxwdmRhcnlqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTc4NjM2NSwiZXhwIjoyMDcxMzYyMzY1fQ.lEOLH0N71wO6OX9QS7WfUh4q5aGVdkYBk3weiYv5ue8"
2025-Nov-22 17:56:51.359378
----------------------------------------
2025-Nov-22 17:56:51.375970
⚠️ Build-time environment variable warning: NODE_ENV=production
2025-Nov-22 17:56:51.390581
Affects: Node.js/npm/yarn/bun/pnpm
2025-Nov-22 17:56:51.404471
Issue: Skips devDependencies installation which are often required for building (webpack, typescript, etc.)
2025-Nov-22 17:56:51.415828
Recommendation: Uncheck "Available at Buildtime" or use "development" during build
2025-Nov-22 17:56:51.431721
2025-Nov-22 17:56:51.461383
💡 Tips to resolve build issues:
2025-Nov-22 17:56:51.471314
1. Set these variables as "Runtime only" in the environment variables settings
2025-Nov-22 17:56:51.483052
2. Use different values for build-time (e.g., NODE_ENV=development for build)
2025-Nov-22 17:56:51.497085
3. Consider using multi-stage Docker builds to separate build and runtime environments
2025-Nov-22 17:56:51.516799
----------------------------------------
2025-Nov-22 17:56:51.535925
Building docker image started.
2025-Nov-22 17:56:51.562304
To check the current progress, click on Show Debug Logs.
2025-Nov-22 17:56:52.636103
[CMD]: docker exec do4s4s44wc84kks0kg8w0k0c bash -c 'nixpacks build -c /artifacts/thegameplan.json --cache-key 'ygcggosc4k4wg04ck8k08w8s' --no-error-without-start -n ygcggosc4k4wg04ck8k08w8s:391a9555b7c48e0556bbe264bdeceb951533de9c /artifacts/do4s4s44wc84kks0kg8w0k0c -o /artifacts/do4s4s44wc84kks0kg8w0k0c'
2025-Nov-22 17:56:52.636103
2025-Nov-22 17:56:52.636103
╔══════════════ Nixpacks v1.41.0 ══════════════╗
2025-Nov-22 17:56:52.636103
║ setup      │ nodejs_24, yarn-1_x, curl, wget ║
2025-Nov-22 17:56:52.636103
║──────────────────────────────────────────────║
2025-Nov-22 17:56:52.636103
║ install    │ yarn install --frozen-lockfile  ║
2025-Nov-22 17:56:52.636103
║──────────────────────────────────────────────║
2025-Nov-22 17:56:52.636103
║ build      │ yarn run build                  ║
2025-Nov-22 17:56:52.636103
║──────────────────────────────────────────────║
2025-Nov-22 17:56:52.636103
║ start      │ yarn run start                  ║
2025-Nov-22 17:56:52.636103
╚══════════════════════════════════════════════╝
2025-Nov-22 17:56:52.640125
Saved output to:
2025-Nov-22 17:56:52.640125
/artifacts/do4s4s44wc84kks0kg8w0k0c
2025-Nov-22 17:56:53.128437
[CMD]: docker exec do4s4s44wc84kks0kg8w0k0c bash -c 'cat /artifacts/do4s4s44wc84kks0kg8w0k0c/.nixpacks/Dockerfile'
2025-Nov-22 17:56:53.128437
FROM ghcr.io/railwayapp/nixpacks:ubuntu-1745885067
2025-Nov-22 17:56:53.128437
2025-Nov-22 17:56:53.128437
ENTRYPOINT ["/bin/bash", "-l", "-c"]
2025-Nov-22 17:56:53.128437
WORKDIR /app/
2025-Nov-22 17:56:53.128437
2025-Nov-22 17:56:53.128437
2025-Nov-22 17:56:53.128437
COPY .nixpacks/nixpkgs-23f9169c4ccce521379e602cc82ed873a1f1b52b.nix .nixpacks/nixpkgs-23f9169c4ccce521379e602cc82ed873a1f1b52b.nix
2025-Nov-22 17:56:53.128437
RUN nix-env -if .nixpacks/nixpkgs-23f9169c4ccce521379e602cc82ed873a1f1b52b.nix && nix-collect-garbage -d
2025-Nov-22 17:56:53.128437
RUN sudo apt-get update && sudo apt-get install -y --no-install-recommends curl wget
2025-Nov-22 17:56:53.128437
2025-Nov-22 17:56:53.128437
ARG CI COOLIFY_BRANCH COOLIFY_CONTAINER_NAME COOLIFY_FQDN COOLIFY_RESOURCE_UUID COOLIFY_URL NEXTAUTH_SECRET NEXTAUTH_URL NEXT_PUBLIC_BASE_URL NEXT_PUBLIC_SUPABASE_ANON_KEY NEXT_PUBLIC_SUPABASE_URL NIXPACKS_METADATA NODE_ENV NPM_CONFIG_PRODUCTION SMTP_PASSWORD SMTP_SECURE SOURCE_COMMIT SUPABASE_SERVICE_ROLE_KEY
2025-Nov-22 17:56:53.128437
ENV CI=$CI COOLIFY_BRANCH=$COOLIFY_BRANCH COOLIFY_CONTAINER_NAME=$COOLIFY_CONTAINER_NAME COOLIFY_FQDN=$COOLIFY_FQDN COOLIFY_RESOURCE_UUID=$COOLIFY_RESOURCE_UUID COOLIFY_URL=$COOLIFY_URL NEXTAUTH_SECRET=$NEXTAUTH_SECRET NEXTAUTH_URL=$NEXTAUTH_URL NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL NIXPACKS_METADATA=$NIXPACKS_METADATA NODE_ENV=$NODE_ENV NPM_CONFIG_PRODUCTION=$NPM_CONFIG_PRODUCTION SMTP_PASSWORD=$SMTP_PASSWORD SMTP_SECURE=$SMTP_SECURE SOURCE_COMMIT=$SOURCE_COMMIT SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_ROLE_KEY
2025-Nov-22 17:56:53.128437
2025-Nov-22 17:56:53.128437
# setup phase
2025-Nov-22 17:56:53.128437
# noop
2025-Nov-22 17:56:53.128437
2025-Nov-22 17:56:53.128437
# install phase
2025-Nov-22 17:56:53.128437
ENV NIXPACKS_PATH=/app/node_modules/.bin:$NIXPACKS_PATH
2025-Nov-22 17:56:53.128437
COPY . /app/.
2025-Nov-22 17:56:53.128437
RUN --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-/usr/local/share/cache/yarn/v6,target=/usr/local/share/.cache/yarn/v6 yarn install --frozen-lockfile
2025-Nov-22 17:56:53.128437
2025-Nov-22 17:56:53.128437
# build phase
2025-Nov-22 17:56:53.128437
COPY . /app/.
2025-Nov-22 17:56:53.128437
RUN --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-next/cache,target=/app/.next/cache --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-node_modules/cache,target=/app/node_modules/.cache yarn run build
2025-Nov-22 17:56:53.128437
2025-Nov-22 17:56:53.128437
2025-Nov-22 17:56:53.128437
RUN printf '\nPATH=/app/node_modules/.bin:$PATH' >> /root/.profile
2025-Nov-22 17:56:53.128437
2025-Nov-22 17:56:53.128437
2025-Nov-22 17:56:53.128437
# start
2025-Nov-22 17:56:53.128437
COPY . /app
2025-Nov-22 17:56:53.128437
2025-Nov-22 17:56:53.128437
CMD ["yarn run start"]
2025-Nov-22 17:56:54.043528
[CMD]: docker exec do4s4s44wc84kks0kg8w0k0c bash -c 'cat /artifacts/build.sh'
2025-Nov-22 17:56:54.043528
cd /artifacts/do4s4s44wc84kks0kg8w0k0c && set -a && source /artifacts/build-time.env && set +a && docker build --add-host ckso4o8w888wkg8ggk0wc8sw:10.0.1.7 --add-host coolify:10.0.1.3 --add-host coolify-db:10.0.1.4 --add-host coolify-realtime:10.0.1.8 --add-host coolify-redis:10.0.1.10 --network host -f /artifacts/do4s4s44wc84kks0kg8w0k0c/.nixpacks/Dockerfile --progress plain -t ygcggosc4k4wg04ck8k08w8s:391a9555b7c48e0556bbe264bdeceb951533de9c --build-arg CI --build-arg COOLIFY_BRANCH --build-arg COOLIFY_CONTAINER_NAME --build-arg COOLIFY_FQDN --build-arg COOLIFY_RESOURCE_UUID --build-arg COOLIFY_URL --build-arg NIXPACKS_METADATA --build-arg NODE_ENV --build-arg NPM_CONFIG_PRODUCTION --build-arg SOURCE_COMMIT --build-arg NEXT_PUBLIC_BASE_URL --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY --build-arg NEXT_PUBLIC_SUPABASE_URL --build-arg NEXTAUTH_SECRET --build-arg NEXTAUTH_URL --build-arg SMTP_PASSWORD --build-arg SMTP_SECURE --build-arg SUPABASE_SERVICE_ROLE_KEY --build-arg COOLIFY_BUILD_SECRETS_HASH=90c092118e66f754a6a9ccdd3c8ac685bc9daff96068a4a1141e515204e276f6 --build-arg 'SOURCE_COMMIT' --build-arg 'COOLIFY_URL' --build-arg 'COOLIFY_FQDN' --build-arg 'COOLIFY_BRANCH' --build-arg 'COOLIFY_RESOURCE_UUID' --build-arg 'COOLIFY_CONTAINER_NAME' /artifacts/do4s4s44wc84kks0kg8w0k0c
2025-Nov-22 17:56:55.047598
[CMD]: docker exec do4s4s44wc84kks0kg8w0k0c bash -c 'bash /artifacts/build.sh'
2025-Nov-22 17:56:55.047598
#0 building with "default" instance using docker driver
2025-Nov-22 17:56:55.047598
2025-Nov-22 17:56:55.047598
#1 [internal] load build definition from Dockerfile
2025-Nov-22 17:56:55.047598
#1 transferring dockerfile:
2025-Nov-22 17:56:55.281634
#1 transferring dockerfile: 2.02kB 0.0s done
2025-Nov-22 17:56:55.281634
#1 DONE 0.2s
2025-Nov-22 17:56:55.281634
2025-Nov-22 17:56:55.281634
#2 [internal] load metadata for ghcr.io/railwayapp/nixpacks:ubuntu-1745885067
2025-Nov-22 17:56:55.466489
#2 DONE 0.3s
2025-Nov-22 17:56:55.574464
#3 [internal] load .dockerignore
2025-Nov-22 17:56:55.574464
#3 transferring context: 2B done
2025-Nov-22 17:56:55.574464
#3 DONE 0.1s
2025-Nov-22 17:56:55.574464
2025-Nov-22 17:56:55.574464
#4 [stage-0  1/11] FROM ghcr.io/railwayapp/nixpacks:ubuntu-1745885067@sha256:d45c89d80e13d7ad0fd555b5130f22a866d9dd10e861f589932303ef2314c7de
2025-Nov-22 17:56:55.574464
#4 DONE 0.0s
2025-Nov-22 17:56:55.574464
2025-Nov-22 17:56:55.574464
#5 [internal] load build context
2025-Nov-22 17:56:55.696853
#5 transferring context: 3.42MB 0.1s done
2025-Nov-22 17:56:55.696853
#5 DONE 0.1s
2025-Nov-22 17:56:55.696853
2025-Nov-22 17:56:55.696853
#6 [stage-0  2/11] WORKDIR /app/
2025-Nov-22 17:56:55.696853
#6 CACHED
2025-Nov-22 17:56:55.696853
2025-Nov-22 17:56:55.696853
#7 [stage-0  3/11] COPY .nixpacks/nixpkgs-23f9169c4ccce521379e602cc82ed873a1f1b52b.nix .nixpacks/nixpkgs-23f9169c4ccce521379e602cc82ed873a1f1b52b.nix
2025-Nov-22 17:56:55.696853
#7 CACHED
2025-Nov-22 17:56:55.696853
2025-Nov-22 17:56:55.696853
#8 [stage-0  4/11] RUN nix-env -if .nixpacks/nixpkgs-23f9169c4ccce521379e602cc82ed873a1f1b52b.nix && nix-collect-garbage -d
2025-Nov-22 17:56:55.696853
#8 CACHED
2025-Nov-22 17:56:55.696853
2025-Nov-22 17:56:55.696853
#9 [stage-0  5/11] RUN sudo apt-get update && sudo apt-get install -y --no-install-recommends curl wget
2025-Nov-22 17:56:55.696853
#9 CACHED
2025-Nov-22 17:56:55.797166
#10 [stage-0  6/11] COPY . /app/.
2025-Nov-22 17:56:55.797166
#10 DONE 0.1s
2025-Nov-22 17:56:55.797166
2025-Nov-22 17:56:55.797166
#11 [stage-0  7/11] RUN --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-/usr/local/share/cache/yarn/v6,target=/usr/local/share/.cache/yarn/v6 yarn install --frozen-lockfile
2025-Nov-22 17:56:56.446970
#11 0.648 yarn install v1.22.22
2025-Nov-22 17:56:56.573229
#11 0.777 [1/5] Validating package.json...
2025-Nov-22 17:56:56.730023
#11 0.783 [2/5] Resolving packages...
2025-Nov-22 17:56:56.887684
#11 1.091 (node:1) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.
2025-Nov-22 17:56:56.887684
#11 1.091 (Use `node --trace-deprecation ...` to show where the warning was created)
2025-Nov-22 17:56:57.044887
#11 1.095 [3/5] Fetching packages...
2025-Nov-22 17:56:57.541732
#11 1.744 [4/5] Linking dependencies...
2025-Nov-22 17:56:57.736109
#11 1.783 warning Workspaces can only be enabled in private projects.
2025-Nov-22 17:56:57.736109
#11 1.789 warning Workspaces can only be enabled in private projects.
2025-Nov-22 17:57:04.968835
#11 9.166 [5/5] Building fresh packages...
2025-Nov-22 17:57:05.342782
#11 9.546 Done in 8.91s.
2025-Nov-22 17:57:05.588398
#11 DONE 9.8s
2025-Nov-22 17:57:05.755137
#12 [stage-0  8/11] COPY . /app/.
2025-Nov-22 17:57:05.774290
#12 DONE 0.2s
2025-Nov-22 17:57:05.936512
#13 [stage-0  9/11] RUN --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-next/cache,target=/app/.next/cache --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-node_modules/cache,target=/app/node_modules/.cache yarn run build
2025-Nov-22 17:57:06.430459
#13 0.644 yarn run v1.22.22
2025-Nov-22 17:57:06.548841
#13 0.763 $ ls -R src && next build
2025-Nov-22 17:57:06.761082
#13 0.824 src:
2025-Nov-22 17:57:06.761082
#13 0.824 app
2025-Nov-22 17:57:06.761082
#13 0.824 components
2025-Nov-22 17:57:06.761082
#13 0.824 lib
2025-Nov-22 17:57:06.761082
#13 0.824 middleware.ts
2025-Nov-22 17:57:06.761082
#13 0.824
2025-Nov-22 17:57:06.761082
#13 0.824 src/app:
2025-Nov-22 17:57:06.761082
#13 0.824 about
2025-Nov-22 17:57:06.761082
#13 0.824 admin
2025-Nov-22 17:57:06.761082
#13 0.824 api
2025-Nov-22 17:57:06.761082
#13 0.824 favicon.ico
2025-Nov-22 17:57:06.761082
#13 0.824 globals.css
2025-Nov-22 17:57:06.761082
#13 0.824 layout.tsx
2025-Nov-22 17:57:06.761082
#13 0.824 page.tsx
2025-Nov-22 17:57:06.761082
#13 0.824 recruiter-results
2025-Nov-22 17:57:06.761082
#13 0.824 services
2025-Nov-22 17:57:06.761082
#13 0.824
2025-Nov-22 17:57:06.761082
#13 0.824 src/app/about:
2025-Nov-22 17:57:06.761082
#13 0.824 page.tsx
2025-Nov-22 17:57:06.761082
#13 0.824
2025-Nov-22 17:57:06.761082
#13 0.824 src/app/admin:
2025-Nov-22 17:57:06.761082
#13 0.824 page.tsx
2025-Nov-22 17:57:06.761082
#13 0.824
2025-Nov-22 17:57:06.761082
#13 0.824 src/app/api:
2025-Nov-22 17:57:06.761082
#13 0.824 analysis
2025-Nov-22 17:57:06.761082
#13 0.824 analytics
2025-Nov-22 17:57:06.761082
#13 0.824 analyze
2025-Nov-22 17:57:06.761082
#13 0.824 auth
2025-Nov-22 17:57:06.761082
#13 0.824 send-email
2025-Nov-22 17:57:06.761082
#13 0.824
2025-Nov-22 17:57:06.761082
#13 0.824 src/app/api/analysis:
2025-Nov-22 17:57:06.761082
#13 0.824 check-limits
2025-Nov-22 17:57:06.761082
#13 0.824 increment-counters
2025-Nov-22 17:57:06.761082
#13 0.824
2025-Nov-22 17:57:06.761082
#13 0.824 src/app/api/analysis/check-limits:
2025-Nov-22 17:57:06.761082
#13 0.824 route.ts
2025-Nov-22 17:57:06.761082
#13 0.824
2025-Nov-22 17:57:06.761082
#13 0.824 src/app/api/analysis/increment-counters:
2025-Nov-22 17:57:06.761082
#13 0.824 route.ts
2025-Nov-22 17:57:06.761082
#13 0.824
2025-Nov-22 17:57:06.761082
#13 0.824 src/app/api/analytics:
2025-Nov-22 17:57:06.761082
#13 0.824 route.ts
2025-Nov-22 17:57:06.761082
#13 0.824
2025-Nov-22 17:57:06.761082
#13 0.824 src/app/api/analyze:
2025-Nov-22 17:57:06.761082
#13 0.824 route.ts
2025-Nov-22 17:57:06.761082
#13 0.824
2025-Nov-22 17:57:06.761082
#13 0.824 src/app/api/auth:
2025-Nov-22 17:57:06.761082
#13 0.824 send-verification-code
2025-Nov-22 17:57:06.761082
#13 0.824 validate-session
2025-Nov-22 17:57:06.761082
#13 0.824 verify-code
2025-Nov-22 17:57:06.761082
#13 0.824
2025-Nov-22 17:57:06.761082
#13 0.824 src/app/api/auth/send-verification-code:
2025-Nov-22 17:57:06.761082
#13 0.824 route.ts
2025-Nov-22 17:57:06.761082
#13 0.824
2025-Nov-22 17:57:06.761082
#13 0.824 src/app/api/auth/validate-session:
2025-Nov-22 17:57:06.761082
#13 0.824 route.ts
2025-Nov-22 17:57:06.761082
#13 0.824
2025-Nov-22 17:57:06.761082
#13 0.824 src/app/api/auth/verify-code:
2025-Nov-22 17:57:06.761082
#13 0.824 route.ts
2025-Nov-22 17:57:06.761082
#13 0.824
2025-Nov-22 17:57:06.761082
#13 0.824 src/app/api/send-email:
2025-Nov-22 17:57:06.761082
#13 0.824 route.ts
2025-Nov-22 17:57:06.761082
#13 0.824
2025-Nov-22 17:57:06.761082
#13 0.824 src/app/recruiter-results:
2025-Nov-22 17:57:06.761082
#13 0.824 json.md
2025-Nov-22 17:57:06.761082
#13 0.824 layout.tsx
2025-Nov-22 17:57:06.761082
#13 0.824 page.tsx
2025-Nov-22 17:57:06.761082
#13 0.824
2025-Nov-22 17:57:06.761082
#13 0.824 src/app/services:
2025-Nov-22 17:57:06.761082
#13 0.824 ia
2025-Nov-22 17:57:06.761082
#13 0.824
2025-Nov-22 17:57:06.761082
#13 0.824 src/app/services/ia:
2025-Nov-22 17:57:06.761082
#13 0.824 page.tsx
2025-Nov-22 17:57:06.761082
#13 0.824
2025-Nov-22 17:57:06.761082
#13 0.824 src/components:
2025-Nov-22 17:57:06.761082
#13 0.824 auth
2025-Nov-22 17:57:06.761082
#13 0.824 layout
2025-Nov-22 17:57:06.761082
#13 0.824 sections
2025-Nov-22 17:57:06.761082
#13 0.824 ui
2025-Nov-22 17:57:06.761082
#13 0.824 whitelist-manager.tsx
2025-Nov-22 17:57:06.761082
#13 0.824
2025-Nov-22 17:57:06.761082
#13 0.824 src/components/auth:
2025-Nov-22 17:57:06.761082
#13 0.824 email-verification-popup.tsx
2025-Nov-22 17:57:06.761082
#13 0.824
2025-Nov-22 17:57:06.761082
#13 0.824 src/components/layout:
2025-Nov-22 17:57:06.761082
#13 0.824 footer.tsx
2025-Nov-22 17:57:06.761082
#13 0.824 header.tsx
2025-Nov-22 17:57:06.761082
#13 0.824
2025-Nov-22 17:57:06.761082
#13 0.824 src/components/sections:
2025-Nov-22 17:57:06.761082
#13 0.824 features.tsx
2025-Nov-22 17:57:06.761082
#13 0.824 hero.tsx
2025-Nov-22 17:57:06.761082
#13 0.824 upload-zone.tsx
2025-Nov-22 17:57:06.761082
#13 0.824
2025-Nov-22 17:57:06.761082
#13 0.824 src/components/ui:
2025-Nov-22 17:57:06.761082
#13 0.824 animation-background.tsx
2025-Nov-22 17:57:06.761082
#13 0.824 badge.tsx
2025-Nov-22 17:57:06.761082
#13 0.824 button.tsx
2025-Nov-22 17:57:06.761082
#13 0.824 card.tsx
2025-Nov-22 17:57:06.761082
#13 0.824 contact-popup.tsx
2025-Nov-22 17:57:06.761082
#13 0.824 dialog.tsx
2025-Nov-22 17:57:06.761082
#13 0.824 gdpr-popup.tsx
2025-Nov-22 17:57:06.761082
#13 0.824 hero-banner.tsx
2025-Nov-22 17:57:06.761082
#13 0.824 input.tsx
2025-Nov-22 17:57:06.761082
#13 0.824 label.tsx
2025-Nov-22 17:57:06.761082
#13 0.824 particle-background.tsx
2025-Nov-22 17:57:06.761082
#13 0.824 rate-limit-popup.tsx
2025-Nov-22 17:57:06.761082
#13 0.824 textarea.tsx
2025-Nov-22 17:57:06.761082
#13 0.824
2025-Nov-22 17:57:06.761082
#13 0.824 src/lib:
2025-Nov-22 17:57:06.761082
#13 0.824 ai-service.ts
2025-Nov-22 17:57:06.761082
#13 0.824 analytics.ts
2025-Nov-22 17:57:06.761082
#13 0.824 auth-service.ts
2025-Nov-22 17:57:06.761082
#13 0.824 cache-cleaner.ts
2025-Nov-22 17:57:06.761082
#13 0.824 constants.ts
2025-Nov-22 17:57:06.761082
#13 0.824 disposable-email-detector.ts
2025-Nov-22 17:57:06.761082
#13 0.824 rate-limit-service.ts
2025-Nov-22 17:57:06.761082
#13 0.824 supabase.ts
2025-Nov-22 17:57:06.761082
#13 0.824 utils.ts
2025-Nov-22 17:57:08.076919
#13 2.294    ▲ Next.js 15.3.4
2025-Nov-22 17:57:08.296389
#13 2.295
2025-Nov-22 17:57:08.296389
#13 2.362    Creating an optimized production build ...
2025-Nov-22 17:57:23.059741
#13 17.28 <w> [webpack.cache.PackFileCacheStrategy] Serializing big strings (128kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
2025-Nov-22 17:57:24.403697
#13 18.62 [Error: Can't resolve 'tw-animate-css' in '/app/src/app'] {
2025-Nov-22 17:57:24.414210
#13 18.62   details: "resolve 'tw-animate-css' in '/app/src/app'\n" +
2025-Nov-22 17:57:24.414210
#13 18.62     '  Parsed request is a module\n' +
2025-Nov-22 17:57:24.414210
#13 18.62     '  using description file: /app/package.json (relative path: ./src/app)\n' +
2025-Nov-22 17:57:24.414210
#13 18.62     '    resolve as module\n' +
2025-Nov-22 17:57:24.414210
#13 18.62     "      /app/src/app/node_modules doesn't exist or is not a directory\n" +
2025-Nov-22 17:57:24.414210
#13 18.62     "      /app/src/node_modules doesn't exist or is not a directory\n" +
2025-Nov-22 17:57:24.414210
#13 18.62     '      looking for modules in /app/node_modules\n' +
2025-Nov-22 17:57:24.414210
#13 18.62     '        single file module\n' +
2025-Nov-22 17:57:24.414210
#13 18.62     '          using description file: /app/package.json (relative path: ./node_modules/tw-animate-css)\n' +
2025-Nov-22 17:57:24.414210
#13 18.62     '            no extension\n' +
2025-Nov-22 17:57:24.414210
#13 18.62     "              /app/node_modules/tw-animate-css doesn't exist\n" +
2025-Nov-22 17:57:24.414210
#13 18.62     '            .css\n' +
2025-Nov-22 17:57:24.414210
#13 18.62     "              /app/node_modules/tw-animate-css.css doesn't exist\n" +
2025-Nov-22 17:57:24.414210
#13 18.62     "        /app/node_modules/tw-animate-css doesn't exist\n" +
2025-Nov-22 17:57:24.414210
#13 18.62     "      /node_modules doesn't exist or is not a directory"
2025-Nov-22 17:57:24.414210
#13 18.62 }
2025-Nov-22 17:57:29.354964
#13 23.57 <w> [webpack.cache.PackFileCacheStrategy] Skipped not serializable cache item 'Compilation/modules|/app/node_modules/next/dist/build/webpack/loaders/css-loader/src/index.js??ruleSet[1].rules[13].oneOf[10].use[2]!/app/node_modules/next/dist/build/webpack/loaders/postcss-loader/src/index.js??ruleSet[1].rules[13].oneOf[10].use[3]!/app/src/app/globals.css': No serializer registered for PostCSSSyntaxError
2025-Nov-22 17:57:29.364345
#13 23.57 <w> while serializing webpack/lib/cache/PackFileCacheStrategy.PackContentItems -> webpack/lib/NormalModule -> webpack/lib/ModuleBuildError -> PostCSSSyntaxError
2025-Nov-22 17:57:29.980843
#13 24.19 Failed to compile.
2025-Nov-22 17:57:29.980843
#13 24.19
2025-Nov-22 17:57:29.980843
#13 24.19 ./src/app/globals.css:1:1
2025-Nov-22 17:57:29.980843
#13 24.19 Syntax error: tailwindcss: /app/src/app/globals.css Can't resolve 'tw-animate-css' in '/app/src/app'
2025-Nov-22 17:57:29.980843
#13 24.19
2025-Nov-22 17:57:29.980843
#13 24.19 > 1 | @import "tailwindcss";
2025-Nov-22 17:57:29.980843
#13 24.19     | ^
2025-Nov-22 17:57:29.980843
#13 24.19   2 | @import "tw-animate-css";
2025-Nov-22 17:57:29.980843
#13 24.19   3 |
2025-Nov-22 17:57:29.980843
#13 24.19
2025-Nov-22 17:57:29.980843
#13 24.19 ./src/app/globals.css
2025-Nov-22 17:57:29.980843
#13 24.19 Syntax error: tailwindcss: /app/src/app/globals.css Can't resolve 'tw-animate-css' in '/app/src/app' (1:1)
2025-Nov-22 17:57:29.980843
#13 24.19
2025-Nov-22 17:57:29.980843
#13 24.19 > 1 | @import "tailwindcss";
2025-Nov-22 17:57:29.980843
#13 24.19     | ^
2025-Nov-22 17:57:29.980843
#13 24.19   2 | @import "tw-animate-css";
2025-Nov-22 17:57:29.980843
#13 24.19   3 |
2025-Nov-22 17:57:29.980843
#13 24.19
2025-Nov-22 17:57:29.980843
#13 24.19     at tryRunOrWebpackError (/app/node_modules/next/dist/compiled/webpack/bundle5.js:29:316142)
2025-Nov-22 17:57:29.980843
#13 24.19     at __webpack_require_module__ (/app/node_modules/next/dist/compiled/webpack/bundle5.js:29:131548)
2025-Nov-22 17:57:29.980843
#13 24.19     at __nested_webpack_require_161494__ (/app/node_modules/next/dist/compiled/webpack/bundle5.js:29:130983)
2025-Nov-22 17:57:29.980843
#13 24.19     at /app/node_modules/next/dist/compiled/webpack/bundle5.js:29:131840
2025-Nov-22 17:57:29.980843
#13 24.19     at symbolIterator (/app/node_modules/next/dist/compiled/neo-async/async.js:1:14444)
2025-Nov-22 17:57:29.980843
#13 24.19     at done (/app/node_modules/next/dist/compiled/neo-async/async.js:1:14824)
2025-Nov-22 17:57:29.980843
#13 24.19     at Hook.eval [as callAsync] (eval at create (/app/node_modules/next/dist/compiled/webpack/bundle5.js:14:9224), <anonymous>:15:1)
2025-Nov-22 17:57:29.980843
#13 24.19     at Hook.CALL_ASYNC_DELEGATE [as _callAsync] (/app/node_modules/next/dist/compiled/webpack/bundle5.js:14:6378)
2025-Nov-22 17:57:29.980843
#13 24.19     at /app/node_modules/next/dist/compiled/webpack/bundle5.js:29:130703
2025-Nov-22 17:57:29.980843
#13 24.19     at symbolIterator (/app/node_modules/next/dist/compiled/neo-async/async.js:1:14402)
2025-Nov-22 17:57:29.980843
#13 24.19 -- inner error --
2025-Nov-22 17:57:29.980843
#13 24.19 Syntax error: tailwindcss: /app/src/app/globals.css Can't resolve 'tw-animate-css' in '/app/src/app' (1:1)
2025-Nov-22 17:57:29.980843
#13 24.19
2025-Nov-22 17:57:29.980843
#13 24.19 > 1 | @import "tailwindcss";
2025-Nov-22 17:57:29.980843
#13 24.19     | ^
2025-Nov-22 17:57:29.980843
#13 24.19   2 | @import "tw-animate-css";
2025-Nov-22 17:57:29.980843
#13 24.19   3 |
2025-Nov-22 17:57:29.980843
#13 24.19
2025-Nov-22 17:57:29.980843
#13 24.19     at Object.<anonymous> (/app/node_modules/next/dist/build/webpack/loaders/css-loader/src/index.js??ruleSet[1].rules[13].oneOf[10].use[2]!/app/node_modules/next/dist/build/webpack/loaders/postcss-loader/src/index.js??ruleSet[1].rules[13].oneOf[10].use[3]!/app/src/app/globals.css:1:7)
2025-Nov-22 17:57:29.980843
#13 24.19     at /app/node_modules/next/dist/compiled/webpack/bundle5.js:29:962742
2025-Nov-22 17:57:29.980843
#13 24.19     at Hook.eval [as call] (eval at create (/app/node_modules/next/dist/compiled/webpack/bundle5.js:14:9002), <anonymous>:7:1)
2025-Nov-22 17:57:29.980843
#13 24.19     at Hook.CALL_DELEGATE [as _call] (/app/node_modules/next/dist/compiled/webpack/bundle5.js:14:6272)
2025-Nov-22 17:57:29.980843
#13 24.19     at /app/node_modules/next/dist/compiled/webpack/bundle5.js:29:131581
2025-Nov-22 17:57:29.980843
#13 24.19     at tryRunOrWebpackError (/app/node_modules/next/dist/compiled/webpack/bundle5.js:29:316096)
2025-Nov-22 17:57:29.980843
#13 24.19     at __webpack_require_module__ (/app/node_modules/next/dist/compiled/webpack/bundle5.js:29:131548)
2025-Nov-22 17:57:29.980843
#13 24.19     at __nested_webpack_require_161494__ (/app/node_modules/next/dist/compiled/webpack/bundle5.js:29:130983)
2025-Nov-22 17:57:29.980843
#13 24.19     at /app/node_modules/next/dist/compiled/webpack/bundle5.js:29:131840
2025-Nov-22 17:57:29.980843
#13 24.19     at symbolIterator (/app/node_modules/next/dist/compiled/neo-async/async.js:1:14444)
2025-Nov-22 17:57:29.980843
#13 24.19
2025-Nov-22 17:57:29.980843
#13 24.19 Generated code for /app/node_modules/next/dist/build/webpack/loaders/css-loader/src/index.js??ruleSet[1].rules[13].oneOf[10].use[2]!/app/node_modules/next/dist/build/webpack/loaders/postcss-loader/src/index.js??ruleSet[1].rules[13].oneOf[10].use[3]!/app/src/app/globals.css
2025-Nov-22 17:57:29.980843
#13 24.19
2025-Nov-22 17:57:29.980843
#13 24.19 Import trace for requested module:
2025-Nov-22 17:57:29.980843
#13 24.19 ./src/app/globals.css
2025-Nov-22 17:57:29.980843
#13 24.19
2025-Nov-22 17:57:30.096184
#13 24.20
2025-Nov-22 17:57:30.096184
#13 24.20 > Build failed because of webpack errors
2025-Nov-22 17:57:30.096184
#13 24.31 error Command failed with exit code 1.
2025-Nov-22 17:57:30.207380
#13 24.31 info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
2025-Nov-22 17:57:30.207380
#13 ERROR: process "/bin/bash -ol pipefail -c yarn run build" did not complete successfully: exit code: 1
2025-Nov-22 17:57:30.277925
------
2025-Nov-22 17:57:30.277925
> [stage-0  9/11] RUN --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-next/cache,target=/app/.next/cache --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-node_modules/cache,target=/app/node_modules/.cache yarn run build:
2025-Nov-22 17:57:30.277925
24.19
2025-Nov-22 17:57:30.277925
24.19 Generated code for /app/node_modules/next/dist/build/webpack/loaders/css-loader/src/index.js??ruleSet[1].rules[13].oneOf[10].use[2]!/app/node_modules/next/dist/build/webpack/loaders/postcss-loader/src/index.js??ruleSet[1].rules[13].oneOf[10].use[3]!/app/src/app/globals.css
2025-Nov-22 17:57:30.277925
24.19
2025-Nov-22 17:57:30.277925
24.19 Import trace for requested module:
2025-Nov-22 17:57:30.277925
24.19 ./src/app/globals.css
2025-Nov-22 17:57:30.277925
24.19
2025-Nov-22 17:57:30.277925
24.20
2025-Nov-22 17:57:30.277925
24.20 > Build failed because of webpack errors
2025-Nov-22 17:57:30.277925
24.31 error Command failed with exit code 1.
2025-Nov-22 17:57:30.277925
24.31 info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
2025-Nov-22 17:57:30.277925
------
2025-Nov-22 17:57:30.285381
9 warnings found (use docker --debug to expand):
2025-Nov-22 17:57:30.285381
- UndefinedVar: Usage of undefined variable '$NIXPACKS_PATH' (line 18)
2025-Nov-22 17:57:30.285381
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ARG "NEXTAUTH_SECRET") (line 11)
2025-Nov-22 17:57:30.285381
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ARG "NEXT_PUBLIC_SUPABASE_ANON_KEY") (line 11)
2025-Nov-22 17:57:30.285381
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ARG "SUPABASE_SERVICE_ROLE_KEY") (line 11)
2025-Nov-22 17:57:30.285381
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ENV "SMTP_PASSWORD") (line 12)
2025-Nov-22 17:57:30.285381
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ARG "SMTP_PASSWORD") (line 11)
2025-Nov-22 17:57:30.285381
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ENV "NEXTAUTH_SECRET") (line 12)
2025-Nov-22 17:57:30.285381
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ENV "NEXT_PUBLIC_SUPABASE_ANON_KEY") (line 12)
2025-Nov-22 17:57:30.285381
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ENV "SUPABASE_SERVICE_ROLE_KEY") (line 12)
2025-Nov-22 17:57:30.290721
Dockerfile:24
2025-Nov-22 17:57:30.290721
--------------------
2025-Nov-22 17:57:30.290721
22 |     # build phase
2025-Nov-22 17:57:30.290721
23 |     COPY . /app/.
2025-Nov-22 17:57:30.290721
24 | >>> RUN --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-next/cache,target=/app/.next/cache --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-node_modules/cache,target=/app/node_modules/.cache yarn run build
2025-Nov-22 17:57:30.290721
25 |
2025-Nov-22 17:57:30.290721
26 |
2025-Nov-22 17:57:30.290721
--------------------
2025-Nov-22 17:57:30.290721
ERROR: failed to build: failed to solve: process "/bin/bash -ol pipefail -c yarn run build" did not complete successfully: exit code: 1
2025-Nov-22 17:57:30.298859
exit status 1
2025-Nov-22 17:57:30.405063
Oops something is not okay, are you okay? 😢
2025-Nov-22 17:57:30.419595
#0 building with "default" instance using docker driver
2025-Nov-22 17:57:30.419595
2025-Nov-22 17:57:30.419595
#1 [internal] load build definition from Dockerfile
2025-Nov-22 17:57:30.419595
#1 transferring dockerfile:
2025-Nov-22 17:57:30.419595
#1 transferring dockerfile: 2.02kB 0.0s done
2025-Nov-22 17:57:30.419595
#1 DONE 0.2s
2025-Nov-22 17:57:30.419595
2025-Nov-22 17:57:30.419595
#2 [internal] load metadata for ghcr.io/railwayapp/nixpacks:ubuntu-1745885067
2025-Nov-22 17:57:30.419595
#2 DONE 0.3s
2025-Nov-22 17:57:30.419595
2025-Nov-22 17:57:30.419595
#3 [internal] load .dockerignore
2025-Nov-22 17:57:30.419595
#3 transferring context: 2B done
2025-Nov-22 17:57:30.419595
#3 DONE 0.1s
2025-Nov-22 17:57:30.419595
2025-Nov-22 17:57:30.419595
#4 [stage-0  1/11] FROM ghcr.io/railwayapp/nixpacks:ubuntu-1745885067@sha256:d45c89d80e13d7ad0fd555b5130f22a866d9dd10e861f589932303ef2314c7de
2025-Nov-22 17:57:30.419595
#4 DONE 0.0s
2025-Nov-22 17:57:30.419595
2025-Nov-22 17:57:30.419595
#5 [internal] load build context
2025-Nov-22 17:57:30.419595
#5 transferring context: 3.42MB 0.1s done
2025-Nov-22 17:57:30.419595
#5 DONE 0.1s
2025-Nov-22 17:57:30.419595
2025-Nov-22 17:57:30.419595
#6 [stage-0  2/11] WORKDIR /app/
2025-Nov-22 17:57:30.419595
#6 CACHED
2025-Nov-22 17:57:30.419595
2025-Nov-22 17:57:30.419595
#7 [stage-0  3/11] COPY .nixpacks/nixpkgs-23f9169c4ccce521379e602cc82ed873a1f1b52b.nix .nixpacks/nixpkgs-23f9169c4ccce521379e602cc82ed873a1f1b52b.nix
2025-Nov-22 17:57:30.419595
#7 CACHED
2025-Nov-22 17:57:30.419595
2025-Nov-22 17:57:30.419595
#8 [stage-0  4/11] RUN nix-env -if .nixpacks/nixpkgs-23f9169c4ccce521379e602cc82ed873a1f1b52b.nix && nix-collect-garbage -d
2025-Nov-22 17:57:30.419595
#8 CACHED
2025-Nov-22 17:57:30.419595
2025-Nov-22 17:57:30.419595
#9 [stage-0  5/11] RUN sudo apt-get update && sudo apt-get install -y --no-install-recommends curl wget
2025-Nov-22 17:57:30.419595
#9 CACHED
2025-Nov-22 17:57:30.419595
2025-Nov-22 17:57:30.419595
#10 [stage-0  6/11] COPY . /app/.
2025-Nov-22 17:57:30.419595
#10 DONE 0.1s
2025-Nov-22 17:57:30.419595
2025-Nov-22 17:57:30.419595
#11 [stage-0  7/11] RUN --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-/usr/local/share/cache/yarn/v6,target=/usr/local/share/.cache/yarn/v6 yarn install --frozen-lockfile
2025-Nov-22 17:57:30.419595
#11 0.648 yarn install v1.22.22
2025-Nov-22 17:57:30.419595
#11 0.777 [1/5] Validating package.json...
2025-Nov-22 17:57:30.419595
#11 0.783 [2/5] Resolving packages...
2025-Nov-22 17:57:30.419595
#11 1.091 (node:1) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.
2025-Nov-22 17:57:30.419595
#11 1.091 (Use `node --trace-deprecation ...` to show where the warning was created)
2025-Nov-22 17:57:30.419595
#11 1.095 [3/5] Fetching packages...
2025-Nov-22 17:57:30.419595
#11 1.744 [4/5] Linking dependencies...
2025-Nov-22 17:57:30.419595
#11 1.783 warning Workspaces can only be enabled in private projects.
2025-Nov-22 17:57:30.419595
#11 1.789 warning Workspaces can only be enabled in private projects.
2025-Nov-22 17:57:30.419595
#11 9.166 [5/5] Building fresh packages...
2025-Nov-22 17:57:30.419595
#11 9.546 Done in 8.91s.
2025-Nov-22 17:57:30.419595
#11 DONE 9.8s
2025-Nov-22 17:57:30.419595
2025-Nov-22 17:57:30.419595
#12 [stage-0  8/11] COPY . /app/.
2025-Nov-22 17:57:30.419595
#12 DONE 0.2s
2025-Nov-22 17:57:30.419595
2025-Nov-22 17:57:30.419595
#13 [stage-0  9/11] RUN --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-next/cache,target=/app/.next/cache --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-node_modules/cache,target=/app/node_modules/.cache yarn run build
2025-Nov-22 17:57:30.419595
#13 0.644 yarn run v1.22.22
2025-Nov-22 17:57:30.419595
#13 0.763 $ ls -R src && next build
2025-Nov-22 17:57:30.419595
#13 0.824 src:
2025-Nov-22 17:57:30.419595
#13 0.824 app
2025-Nov-22 17:57:30.419595
#13 0.824 components
2025-Nov-22 17:57:30.419595
#13 0.824 lib
2025-Nov-22 17:57:30.419595
#13 0.824 middleware.ts
2025-Nov-22 17:57:30.419595
#13 0.824
2025-Nov-22 17:57:30.419595
#13 0.824 src/app:
2025-Nov-22 17:57:30.419595
#13 0.824 about
2025-Nov-22 17:57:30.419595
#13 0.824 admin
2025-Nov-22 17:57:30.419595
#13 0.824 api
2025-Nov-22 17:57:30.419595
#13 0.824 favicon.ico
2025-Nov-22 17:57:30.419595
#13 0.824 globals.css
2025-Nov-22 17:57:30.419595
#13 0.824 layout.tsx
2025-Nov-22 17:57:30.419595
#13 0.824 page.tsx
2025-Nov-22 17:57:30.419595
#13 0.824 recruiter-results
2025-Nov-22 17:57:30.419595
#13 0.824 services
2025-Nov-22 17:57:30.419595
#13 0.824
2025-Nov-22 17:57:30.419595
#13 0.824 src/app/about:
2025-Nov-22 17:57:30.419595
#13 0.824 page.tsx
2025-Nov-22 17:57:30.419595
#13 0.824
2025-Nov-22 17:57:30.419595
#13 0.824 src/app/admin:
2025-Nov-22 17:57:30.419595
#13 0.824 page.tsx
2025-Nov-22 17:57:30.419595
#13 0.824
2025-Nov-22 17:57:30.419595
#13 0.824 src/app/api:
2025-Nov-22 17:57:30.419595
#13 0.824 analysis
2025-Nov-22 17:57:30.419595
#13 0.824 analytics
2025-Nov-22 17:57:30.419595
#13 0.824 analyze
2025-Nov-22 17:57:30.419595
#13 0.824 auth
2025-Nov-22 17:57:30.419595
#13 0.824 send-email
2025-Nov-22 17:57:30.419595
#13 0.824
2025-Nov-22 17:57:30.419595
#13 0.824 src/app/api/analysis:
2025-Nov-22 17:57:30.419595
#13 0.824 check-limits
2025-Nov-22 17:57:30.419595
#13 0.824 increment-counters
2025-Nov-22 17:57:30.419595
#13 0.824
2025-Nov-22 17:57:30.419595
#13 0.824 src/app/api/analysis/check-limits:
2025-Nov-22 17:57:30.419595
#13 0.824 route.ts
2025-Nov-22 17:57:30.419595
#13 0.824
2025-Nov-22 17:57:30.419595
#13 0.824 src/app/api/analysis/increment-counters:
2025-Nov-22 17:57:30.419595
#13 0.824 route.ts
2025-Nov-22 17:57:30.419595
#13 0.824
2025-Nov-22 17:57:30.419595
#13 0.824 src/app/api/analytics:
2025-Nov-22 17:57:30.419595
#13 0.824 route.ts
2025-Nov-22 17:57:30.419595
#13 0.824
2025-Nov-22 17:57:30.419595
#13 0.824 src/app/api/analyze:
2025-Nov-22 17:57:30.419595
#13 0.824 route.ts
2025-Nov-22 17:57:30.419595
#13 0.824
2025-Nov-22 17:57:30.419595
#13 0.824 src/app/api/auth:
2025-Nov-22 17:57:30.419595
#13 0.824 send-verification-code
2025-Nov-22 17:57:30.419595
#13 0.824 validate-session
2025-Nov-22 17:57:30.419595
#13 0.824 verify-code
2025-Nov-22 17:57:30.419595
#13 0.824
2025-Nov-22 17:57:30.419595
#13 0.824 src/app/api/auth/send-verification-code:
2025-Nov-22 17:57:30.419595
#13 0.824 route.ts
2025-Nov-22 17:57:30.419595
#13 0.824
2025-Nov-22 17:57:30.419595
#13 0.824 src/app/api/auth/validate-session:
2025-Nov-22 17:57:30.419595
#13 0.824 route.ts
2025-Nov-22 17:57:30.419595
#13 0.824
2025-Nov-22 17:57:30.419595
#13 0.824 src/app/api/auth/verify-code:
2025-Nov-22 17:57:30.419595
#13 0.824 route.ts
2025-Nov-22 17:57:30.419595
#13 0.824
2025-Nov-22 17:57:30.419595
#13 0.824 src/app/api/send-email:
2025-Nov-22 17:57:30.419595
#13 0.824 route.ts
2025-Nov-22 17:57:30.419595
#13 0.824
2025-Nov-22 17:57:30.419595
#13 0.824 src/app/recruiter-results:
2025-Nov-22 17:57:30.419595
#13 0.824 json.md
2025-Nov-22 17:57:30.419595
#13 0.824 layout.tsx
2025-Nov-22 17:57:30.419595
#13 0.824 page.tsx
2025-Nov-22 17:57:30.419595
#13 0.824
2025-Nov-22 17:57:30.419595
#13 0.824 src/app/services:
2025-Nov-22 17:57:30.419595
#13 0.824 ia
2025-Nov-22 17:57:30.419595
#13 0.824
2025-Nov-22 17:57:30.419595
#13 0.824 src/app/services/ia:
2025-Nov-22 17:57:30.419595
#13 0.824 page.tsx
2025-Nov-22 17:57:30.419595
#13 0.824
2025-Nov-22 17:57:30.419595
#13 0.824 src/components:
2025-Nov-22 17:57:30.419595
#13 0.824 auth
2025-Nov-22 17:57:30.419595
#13 0.824 layout
2025-Nov-22 17:57:30.419595
#13 0.824 sections
2025-Nov-22 17:57:30.419595
#13 0.824 ui
2025-Nov-22 17:57:30.419595
#13 0.824 whitelist-manager.tsx
2025-Nov-22 17:57:30.419595
#13 0.824
2025-Nov-22 17:57:30.419595
#13 0.824 src/components/auth:
2025-Nov-22 17:57:30.419595
#13 0.824 email-verification-popup.tsx
2025-Nov-22 17:57:30.419595
#13 0.824
2025-Nov-22 17:57:30.419595
#13 0.824 src/components/layout:
2025-Nov-22 17:57:30.419595
#13 0.824 footer.tsx
2025-Nov-22 17:57:30.419595
#13 0.824 header.tsx
2025-Nov-22 17:57:30.419595
#13 0.824
2025-Nov-22 17:57:30.419595
#13 0.824 src/components/sections:
2025-Nov-22 17:57:30.419595
#13 0.824 features.tsx
2025-Nov-22 17:57:30.419595
#13 0.824 hero.tsx
2025-Nov-22 17:57:30.419595
#13 0.824 upload-zone.tsx
2025-Nov-22 17:57:30.419595
#13 0.824
2025-Nov-22 17:57:30.419595
#13 0.824 src/components/ui:
2025-Nov-22 17:57:30.419595
#13 0.824 animation-background.tsx
2025-Nov-22 17:57:30.419595
#13 0.824 badge.tsx
2025-Nov-22 17:57:30.419595
#13 0.824 button.tsx
2025-Nov-22 17:57:30.419595
#13 0.824 card.tsx
2025-Nov-22 17:57:30.419595
#13 0.824 contact-popup.tsx
2025-Nov-22 17:57:30.419595
#13 0.824 dialog.tsx
2025-Nov-22 17:57:30.419595
#13 0.824 gdpr-popup.tsx
2025-Nov-22 17:57:30.419595
#13 0.824 hero-banner.tsx
2025-Nov-22 17:57:30.419595
#13 0.824 input.tsx
2025-Nov-22 17:57:30.419595
#13 0.824 label.tsx
2025-Nov-22 17:57:30.419595
#13 0.824 particle-background.tsx
2025-Nov-22 17:57:30.419595
#13 0.824 rate-limit-popup.tsx
2025-Nov-22 17:57:30.419595
#13 0.824 textarea.tsx
2025-Nov-22 17:57:30.419595
#13 0.824
2025-Nov-22 17:57:30.419595
#13 0.824 src/lib:
2025-Nov-22 17:57:30.419595
#13 0.824 ai-service.ts
2025-Nov-22 17:57:30.419595
#13 0.824 analytics.ts
2025-Nov-22 17:57:30.419595
#13 0.824 auth-service.ts
2025-Nov-22 17:57:30.419595
#13 0.824 cache-cleaner.ts
2025-Nov-22 17:57:30.419595
#13 0.824 constants.ts
2025-Nov-22 17:57:30.419595
#13 0.824 disposable-email-detector.ts
2025-Nov-22 17:57:30.419595
#13 0.824 rate-limit-service.ts
2025-Nov-22 17:57:30.419595
#13 0.824 supabase.ts
2025-Nov-22 17:57:30.419595
#13 0.824 utils.ts
2025-Nov-22 17:57:30.419595
#13 2.294    ▲ Next.js 15.3.4
2025-Nov-22 17:57:30.419595
#13 2.295
2025-Nov-22 17:57:30.419595
#13 2.362    Creating an optimized production build ...
2025-Nov-22 17:57:30.419595
#13 17.28 <w> [webpack.cache.PackFileCacheStrategy] Serializing big strings (128kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
2025-Nov-22 17:57:30.419595
#13 18.62 [Error: Can't resolve 'tw-animate-css' in '/app/src/app'] {
2025-Nov-22 17:57:30.419595
#13 18.62   details: "resolve 'tw-animate-css' in '/app/src/app'\n" +
2025-Nov-22 17:57:30.419595
#13 18.62     '  Parsed request is a module\n' +
2025-Nov-22 17:57:30.419595
#13 18.62     '  using description file: /app/package.json (relative path: ./src/app)\n' +
2025-Nov-22 17:57:30.419595
#13 18.62     '    resolve as module\n' +
2025-Nov-22 17:57:30.419595
#13 18.62     "      /app/src/app/node_modules doesn't exist or is not a directory\n" +
2025-Nov-22 17:57:30.419595
#13 18.62     "      /app/src/node_modules doesn't exist or is not a directory\n" +
2025-Nov-22 17:57:30.419595
#13 18.62     '      looking for modules in /app/node_modules\n' +
2025-Nov-22 17:57:30.419595
#13 18.62     '        single file module\n' +
2025-Nov-22 17:57:30.419595
#13 18.62     '          using description file: /app/package.json (relative path: ./node_modules/tw-animate-css)\n' +
2025-Nov-22 17:57:30.419595
#13 18.62     '            no extension\n' +
2025-Nov-22 17:57:30.419595
#13 18.62     "              /app/node_modules/tw-animate-css doesn't exist\n" +
2025-Nov-22 17:57:30.419595
#13 18.62     '            .css\n' +
2025-Nov-22 17:57:30.419595
#13 18.62     "              /app/node_modules/tw-animate-css.css doesn't exist\n" +
2025-Nov-22 17:57:30.419595
#13 18.62     "        /app/node_modules/tw-animate-css doesn't exist\n" +
2025-Nov-22 17:57:30.419595
#13 18.62     "      /node_modules doesn't exist or is not a directory"
2025-Nov-22 17:57:30.419595
#13 18.62 }
2025-Nov-22 17:57:30.419595
#13 23.57 <w> [webpack.cache.PackFileCacheStrategy] Skipped not serializable cache item 'Compilation/modules|/app/node_modules/next/dist/build/webpack/loaders/css-loader/src/index.js??ruleSet[1].rules[13].oneOf[10].use[2]!/app/node_modules/next/dist/build/webpack/loaders/postcss-loader/src/index.js??ruleSet[1].rules[13].oneOf[10].use[3]!/app/src/app/globals.css': No serializer registered for PostCSSSyntaxError
2025-Nov-22 17:57:30.419595
#13 23.57 <w> while serializing webpack/lib/cache/PackFileCacheStrategy.PackContentItems -> webpack/lib/NormalModule -> webpack/lib/ModuleBuildError -> PostCSSSyntaxError
2025-Nov-22 17:57:30.419595
#13 24.19 Failed to compile.
2025-Nov-22 17:57:30.419595
#13 24.19
2025-Nov-22 17:57:30.419595
#13 24.19 ./src/app/globals.css:1:1
2025-Nov-22 17:57:30.419595
#13 24.19 Syntax error: tailwindcss: /app/src/app/globals.css Can't resolve 'tw-animate-css' in '/app/src/app'
2025-Nov-22 17:57:30.419595
#13 24.19
2025-Nov-22 17:57:30.419595
#13 24.19 > 1 | @import "tailwindcss";
2025-Nov-22 17:57:30.419595
#13 24.19     | ^
2025-Nov-22 17:57:30.419595
#13 24.19   2 | @import "tw-animate-css";
2025-Nov-22 17:57:30.419595
#13 24.19   3 |
2025-Nov-22 17:57:30.419595
#13 24.19
2025-Nov-22 17:57:30.419595
#13 24.19 ./src/app/globals.css
2025-Nov-22 17:57:30.419595
#13 24.19 Syntax error: tailwindcss: /app/src/app/globals.css Can't resolve 'tw-animate-css' in '/app/src/app' (1:1)
2025-Nov-22 17:57:30.419595
#13 24.19
2025-Nov-22 17:57:30.419595
#13 24.19 > 1 | @import "tailwindcss";
2025-Nov-22 17:57:30.419595
#13 24.19     | ^
2025-Nov-22 17:57:30.419595
#13 24.19   2 | @import "tw-animate-css";
2025-Nov-22 17:57:30.419595
#13 24.19   3 |
2025-Nov-22 17:57:30.419595
#13 24.19
2025-Nov-22 17:57:30.419595
#13 24.19     at tryRunOrWebpackError (/app/node_modules/next/dist/compiled/webpack/bundle5.js:29:316142)
2025-Nov-22 17:57:30.419595
#13 24.19     at __webpack_require_module__ (/app/node_modules/next/dist/compiled/webpack/bundle5.js:29:131548)
2025-Nov-22 17:57:30.419595
#13 24.19     at __nested_webpack_require_161494__ (/app/node_modules/next/dist/compiled/webpack/bundle5.js:29:130983)
2025-Nov-22 17:57:30.419595
#13 24.19     at /app/node_modules/next/dist/compiled/webpack/bundle5.js:29:131840
2025-Nov-22 17:57:30.419595
#13 24.19     at symbolIterator (/app/node_modules/next/dist/compiled/neo-async/async.js:1:14444)
2025-Nov-22 17:57:30.419595
#13 24.19     at done (/app/node_modules/next/dist/compiled/neo-async/async.js:1:14824)
2025-Nov-22 17:57:30.419595
#13 24.19     at Hook.eval [as callAsync] (eval at create (/app/node_modules/next/dist/compiled/webpack/bundle5.js:14:9224), <anonymous>:15:1)
2025-Nov-22 17:57:30.419595
#13 24.19     at Hook.CALL_ASYNC_DELEGATE [as _callAsync] (/app/node_modules/next/dist/compiled/webpack/bundle5.js:14:6378)
2025-Nov-22 17:57:30.419595
#13 24.19     at /app/node_modules/next/dist/compiled/webpack/bundle5.js:29:130703
2025-Nov-22 17:57:30.419595
#13 24.19     at symbolIterator (/app/node_modules/next/dist/compiled/neo-async/async.js:1:14402)
2025-Nov-22 17:57:30.419595
#13 24.19 -- inner error --
2025-Nov-22 17:57:30.419595
#13 24.19 Syntax error: tailwindcss: /app/src/app/globals.css Can't resolve 'tw-animate-css' in '/app/src/app' (1:1)
2025-Nov-22 17:57:30.419595
#13 24.19
2025-Nov-22 17:57:30.419595
#13 24.19 > 1 | @import "tailwindcss";
2025-Nov-22 17:57:30.419595
#13 24.19     | ^
2025-Nov-22 17:57:30.419595
#13 24.19   2 | @import "tw-animate-css";
2025-Nov-22 17:57:30.419595
#13 24.19   3 |
2025-Nov-22 17:57:30.419595
#13 24.19
2025-Nov-22 17:57:30.419595
#13 24.19     at Object.<anonymous> (/app/node_modules/next/dist/build/webpack/loaders/css-loader/src/index.js??ruleSet[1].rules[13].oneOf[10].use[2]!/app/node_modules/next/dist/build/webpack/loaders/postcss-loader/src/index.js??ruleSet[1].rules[13].oneOf[10].use[3]!/app/src/app/globals.css:1:7)
2025-Nov-22 17:57:30.419595
#13 24.19     at /app/node_modules/next/dist/compiled/webpack/bundle5.js:29:962742
2025-Nov-22 17:57:30.419595
#13 24.19     at Hook.eval [as call] (eval at create (/app/node_modules/next/dist/compiled/webpack/bundle5.js:14:9002), <anonymous>:7:1)
2025-Nov-22 17:57:30.419595
#13 24.19     at Hook.CALL_DELEGATE [as _call] (/app/node_modules/next/dist/compiled/webpack/bundle5.js:14:6272)
2025-Nov-22 17:57:30.419595
#13 24.19     at /app/node_modules/next/dist/compiled/webpack/bundle5.js:29:131581
2025-Nov-22 17:57:30.419595
#13 24.19     at tryRunOrWebpackError (/app/node_modules/next/dist/compiled/webpack/bundle5.js:29:316096)
2025-Nov-22 17:57:30.419595
#13 24.19     at __webpack_require_module__ (/app/node_modules/next/dist/compiled/webpack/bundle5.js:29:131548)
2025-Nov-22 17:57:30.419595
#13 24.19     at __nested_webpack_require_161494__ (/app/node_modules/next/dist/compiled/webpack/bundle5.js:29:130983)
2025-Nov-22 17:57:30.419595
#13 24.19     at /app/node_modules/next/dist/compiled/webpack/bundle5.js:29:131840
2025-Nov-22 17:57:30.419595
#13 24.19     at symbolIterator (/app/node_modules/next/dist/compiled/neo-async/async.js:1:14444)
2025-Nov-22 17:57:30.419595
#13 24.19
2025-Nov-22 17:57:30.419595
#13 24.19 Generated code for /app/node_modules/next/dist/build/webpack/loaders/css-loader/src/index.js??ruleSet[1].rules[13].oneOf[10].use[2]!/app/node_modules/next/dist/build/webpack/loaders/postcss-loader/src/index.js??ruleSet[1].rules[13].oneOf[10].use[3]!/app/src/app/globals.css
2025-Nov-22 17:57:30.419595
#13 24.19
2025-Nov-22 17:57:30.419595
#13 24.19 Import trace for requested module:
2025-Nov-22 17:57:30.419595
#13 24.19 ./src/app/globals.css
2025-Nov-22 17:57:30.419595
#13 24.19
2025-Nov-22 17:57:30.419595
#13 24.20
2025-Nov-22 17:57:30.419595
#13 24.20 > Build failed because of webpack errors
2025-Nov-22 17:57:30.419595
#13 24.31 error Command failed with exit code 1.
2025-Nov-22 17:57:30.419595
#13 24.31 info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
2025-Nov-22 17:57:30.419595
#13 ERROR: process "/bin/bash -ol pipefail -c yarn run build" did not complete successfully: exit code: 1
2025-Nov-22 17:57:30.419595
------
2025-Nov-22 17:57:30.419595
> [stage-0  9/11] RUN --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-next/cache,target=/app/.next/cache --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-node_modules/cache,target=/app/node_modules/.cache yarn run build:
2025-Nov-22 17:57:30.419595
24.19
2025-Nov-22 17:57:30.419595
24.19 Generated code for /app/node_modules/next/dist/build/webpack/loaders/css-loader/src/index.js??ruleSet[1].rules[13].oneOf[10].use[2]!/app/node_modules/next/dist/build/webpack/loaders/postcss-loader/src/index.js??ruleSet[1].rules[13].oneOf[10].use[3]!/app/src/app/globals.css
2025-Nov-22 17:57:30.419595
24.19
2025-Nov-22 17:57:30.419595
24.19 Import trace for requested module:
2025-Nov-22 17:57:30.419595
24.19 ./src/app/globals.css
2025-Nov-22 17:57:30.419595
24.19
2025-Nov-22 17:57:30.419595
24.20
2025-Nov-22 17:57:30.419595
24.20 > Build failed because of webpack errors
2025-Nov-22 17:57:30.419595
24.31 error Command failed with exit code 1.
2025-Nov-22 17:57:30.419595
24.31 info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
2025-Nov-22 17:57:30.419595
------
2025-Nov-22 17:57:30.419595
2025-Nov-22 17:57:30.419595
9 warnings found (use docker --debug to expand):
2025-Nov-22 17:57:30.419595
- UndefinedVar: Usage of undefined variable '$NIXPACKS_PATH' (line 18)
2025-Nov-22 17:57:30.419595
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ARG "NEXTAUTH_SECRET") (line 11)
2025-Nov-22 17:57:30.419595
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ARG "NEXT_PUBLIC_SUPABASE_ANON_KEY") (line 11)
2025-Nov-22 17:57:30.419595
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ARG "SUPABASE_SERVICE_ROLE_KEY") (line 11)
2025-Nov-22 17:57:30.419595
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ENV "SMTP_PASSWORD") (line 12)
2025-Nov-22 17:57:30.419595
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ARG "SMTP_PASSWORD") (line 11)
2025-Nov-22 17:57:30.419595
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ENV "NEXTAUTH_SECRET") (line 12)
2025-Nov-22 17:57:30.419595
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ENV "NEXT_PUBLIC_SUPABASE_ANON_KEY") (line 12)
2025-Nov-22 17:57:30.419595
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ENV "SUPABASE_SERVICE_ROLE_KEY") (line 12)
2025-Nov-22 17:57:30.419595
Dockerfile:24
2025-Nov-22 17:57:30.419595
--------------------
2025-Nov-22 17:57:30.419595
22 |     # build phase
2025-Nov-22 17:57:30.419595
23 |     COPY . /app/.
2025-Nov-22 17:57:30.419595
24 | >>> RUN --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-next/cache,target=/app/.next/cache --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-node_modules/cache,target=/app/node_modules/.cache yarn run build
2025-Nov-22 17:57:30.419595
25 |
2025-Nov-22 17:57:30.419595
26 |
2025-Nov-22 17:57:30.419595
--------------------
2025-Nov-22 17:57:30.419595
ERROR: failed to build: failed to solve: process "/bin/bash -ol pipefail -c yarn run build" did not complete successfully: exit code: 1
2025-Nov-22 17:57:30.419595
exit status 1
2025-Nov-22 17:57:30.435458
Deployment failed. Removing the new version of your application.
2025-Nov-22 17:57:31.894929
Gracefully shutting down build container: do4s4s44wc84kks0kg8w0k0c
2025-Nov-22 17:57:32.599974
[CMD]: docker stop --time=30 do4s4s44wc84kks0kg8w0k0c
2025-Nov-22 17:57:32.599974
do4s4s44wc84kks0kg8w0k0c
2025-Nov-22 17:57:32.959354
[CMD]: docker rm -f do4s4s44wc84kks0kg8w0k0c
2025-Nov-22 17:57:32.959354
Error response from daemon: No such container: do4s4s44wc84kks0kg8w0k0c