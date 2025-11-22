Starting deployment of francoform/IA_Recrutement_Pro:main to localhost.
2025-Nov-22 17:45:19.213425
Preparing container with helper image: ghcr.io/coollabsio/coolify-helper:1.0.12
2025-Nov-22 17:45:19.527934
[CMD]: docker stop --time=30 m8w0sksw4sokc0oksgc00080
2025-Nov-22 17:45:19.527934
Error response from daemon: No such container: m8w0sksw4sokc0oksgc00080
2025-Nov-22 17:45:19.887983
[CMD]: docker rm -f m8w0sksw4sokc0oksgc00080
2025-Nov-22 17:45:19.887983
Error response from daemon: No such container: m8w0sksw4sokc0oksgc00080
2025-Nov-22 17:45:20.225484
[CMD]: docker run -d --network coolify --name m8w0sksw4sokc0oksgc00080  --rm -v /var/run/docker.sock:/var/run/docker.sock ghcr.io/coollabsio/coolify-helper:1.0.12
2025-Nov-22 17:45:20.225484
64d75a50d889fd80f8315ea788a01e5e30b2ed3f5d76454d60293b9864325ce8
2025-Nov-22 17:45:22.529371
[CMD]: docker exec m8w0sksw4sokc0oksgc00080 bash -c 'GIT_SSH_COMMAND="ssh -o ConnectTimeout=30 -p 22 -o Port=22 -o LogLevel=ERROR -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" git ls-remote https://x-access-token:<REDACTED>@github.com/francoform/IA_Recrutement_Pro.git refs/heads/main'
2025-Nov-22 17:45:22.529371
4fe3da8f7fdd6f4e2979e68234e14e881250606c	refs/heads/main
2025-Nov-22 17:45:22.907594
Image not found (ygcggosc4k4wg04ck8k08w8s:4fe3da8f7fdd6f4e2979e68234e14e881250606c). Building new image.
2025-Nov-22 17:45:23.148363
----------------------------------------
2025-Nov-22 17:45:23.167865
Importing francoform/IA_Recrutement_Pro:main (commit sha 4fe3da8f7fdd6f4e2979e68234e14e881250606c) to /artifacts/m8w0sksw4sokc0oksgc00080.
2025-Nov-22 17:45:23.563415
[CMD]: docker exec m8w0sksw4sokc0oksgc00080 bash -c 'git clone --depth=1 --recurse-submodules --shallow-submodules -b 'main' 'https://x-access-token:<REDACTED>@github.com/francoform/IA_Recrutement_Pro.git' '/artifacts/m8w0sksw4sokc0oksgc00080' && cd '/artifacts/m8w0sksw4sokc0oksgc00080' && if [ -f .gitmodules ]; then git submodule sync && GIT_SSH_COMMAND="ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" git submodule update --init --recursive --depth=1; fi && cd '/artifacts/m8w0sksw4sokc0oksgc00080' && GIT_SSH_COMMAND="ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" git lfs pull'
2025-Nov-22 17:45:23.563415
Cloning into '/artifacts/m8w0sksw4sokc0oksgc00080'...
2025-Nov-22 17:45:25.945912
[CMD]: docker exec m8w0sksw4sokc0oksgc00080 bash -c 'cd /artifacts/m8w0sksw4sokc0oksgc00080 && git log -1 4fe3da8f7fdd6f4e2979e68234e14e881250606c --pretty=%B'
2025-Nov-22 17:45:25.945912
fix: Debug build and refine tsconfig paths
2025-Nov-22 17:45:25.949655
- Add 'ls -R src' to build script to debug file presence in Docker
2025-Nov-22 17:45:25.949655
- Refine tsconfig.json paths (remove ./ prefix) and add 'src' to include
2025-Nov-22 17:45:26.344677
Generating nixpacks configuration with: nixpacks plan -f json --env SOURCE_COMMIT=4fe3da8f7fdd6f4e2979e68234e14e881250606c --env COOLIFY_URL=https://ia-recrutement-pro.be2web.fr --env COOLIFY_FQDN=ia-recrutement-pro.be2web.fr --env COOLIFY_BRANCH=main --env COOLIFY_RESOURCE_UUID=ygcggosc4k4wg04ck8k08w8s --env COOLIFY_CONTAINER_NAME=ygcggosc4k4wg04ck8k08w8s-174515852765 /artifacts/m8w0sksw4sokc0oksgc00080
2025-Nov-22 17:45:26.737123
[CMD]: docker exec m8w0sksw4sokc0oksgc00080 bash -c 'nixpacks plan -f json --env SOURCE_COMMIT=4fe3da8f7fdd6f4e2979e68234e14e881250606c --env COOLIFY_URL=https://ia-recrutement-pro.be2web.fr --env COOLIFY_FQDN=ia-recrutement-pro.be2web.fr --env COOLIFY_BRANCH=main --env COOLIFY_RESOURCE_UUID=ygcggosc4k4wg04ck8k08w8s --env COOLIFY_CONTAINER_NAME=ygcggosc4k4wg04ck8k08w8s-174515852765 /artifacts/m8w0sksw4sokc0oksgc00080'
2025-Nov-22 17:45:26.737123
{
2025-Nov-22 17:45:26.737123
"providers": [],
2025-Nov-22 17:45:26.737123
"buildImage": "ghcr.io/railwayapp/nixpacks:ubuntu-1745885067",
2025-Nov-22 17:45:26.737123
"variables": {
2025-Nov-22 17:45:26.737123
"CI": "true",
2025-Nov-22 17:45:26.737123
"COOLIFY_BRANCH": "main",
2025-Nov-22 17:45:26.737123
"COOLIFY_CONTAINER_NAME": "ygcggosc4k4wg04ck8k08w8s-174515852765",
2025-Nov-22 17:45:26.737123
"COOLIFY_FQDN": "ia-recrutement-pro.be2web.fr",
2025-Nov-22 17:45:26.737123
"COOLIFY_RESOURCE_UUID": "ygcggosc4k4wg04ck8k08w8s",
2025-Nov-22 17:45:26.737123
"COOLIFY_URL": "https://ia-recrutement-pro.be2web.fr",
2025-Nov-22 17:45:26.737123
"NIXPACKS_METADATA": "node",
2025-Nov-22 17:45:26.737123
"NODE_ENV": "production",
2025-Nov-22 17:45:26.737123
"NPM_CONFIG_PRODUCTION": "false",
2025-Nov-22 17:45:26.737123
"SOURCE_COMMIT": "4fe3da8f7fdd6f4e2979e68234e14e881250606c"
2025-Nov-22 17:45:26.737123
},
2025-Nov-22 17:45:26.737123
"phases": {
2025-Nov-22 17:45:26.737123
"build": {
2025-Nov-22 17:45:26.737123
"dependsOn": [
2025-Nov-22 17:45:26.737123
"install"
2025-Nov-22 17:45:26.737123
],
2025-Nov-22 17:45:26.737123
"cmds": [
2025-Nov-22 17:45:26.737123
"yarn run build"
2025-Nov-22 17:45:26.737123
],
2025-Nov-22 17:45:26.737123
"cacheDirectories": [
2025-Nov-22 17:45:26.737123
".next/cache",
2025-Nov-22 17:45:26.737123
"node_modules/.cache"
2025-Nov-22 17:45:26.737123
]
2025-Nov-22 17:45:26.737123
},
2025-Nov-22 17:45:26.737123
"install": {
2025-Nov-22 17:45:26.737123
"dependsOn": [
2025-Nov-22 17:45:26.737123
"setup"
2025-Nov-22 17:45:26.737123
],
2025-Nov-22 17:45:26.737123
"cmds": [
2025-Nov-22 17:45:26.737123
"yarn install --frozen-lockfile"
2025-Nov-22 17:45:26.737123
],
2025-Nov-22 17:45:26.737123
"cacheDirectories": [
2025-Nov-22 17:45:26.737123
"/usr/local/share/.cache/yarn/v6"
2025-Nov-22 17:45:26.737123
],
2025-Nov-22 17:45:26.737123
"paths": [
2025-Nov-22 17:45:26.737123
"/app/node_modules/.bin"
2025-Nov-22 17:45:26.737123
]
2025-Nov-22 17:45:26.737123
},
2025-Nov-22 17:45:26.737123
"setup": {
2025-Nov-22 17:45:26.737123
"nixPkgs": [
2025-Nov-22 17:45:26.737123
"nodejs_24",
2025-Nov-22 17:45:26.737123
"yarn-1_x"
2025-Nov-22 17:45:26.737123
],
2025-Nov-22 17:45:26.737123
"nixLibs": [
2025-Nov-22 17:45:26.737123
"gcc-unwrapped"
2025-Nov-22 17:45:26.737123
],
2025-Nov-22 17:45:26.737123
"nixOverlays": [
2025-Nov-22 17:45:26.737123
"https://github.com/railwayapp/nix-npm-overlay/archive/main.tar.gz"
2025-Nov-22 17:45:26.737123
],
2025-Nov-22 17:45:26.737123
"nixpkgsArchive": "23f9169c4ccce521379e602cc82ed873a1f1b52b"
2025-Nov-22 17:45:26.737123
}
2025-Nov-22 17:45:26.737123
},
2025-Nov-22 17:45:26.737123
"start": {
2025-Nov-22 17:45:26.737123
"cmd": "yarn run start"
2025-Nov-22 17:45:26.737123
}
2025-Nov-22 17:45:26.737123
}
2025-Nov-22 17:45:27.114018
[CMD]: docker exec m8w0sksw4sokc0oksgc00080 bash -c 'nixpacks detect /artifacts/m8w0sksw4sokc0oksgc00080'
2025-Nov-22 17:45:27.114018
node
2025-Nov-22 17:45:27.125003
Found application type: node.
2025-Nov-22 17:45:27.134488
If you need further customization, please check the documentation of Nixpacks: https://nixpacks.com/docs/providers/node
2025-Nov-22 17:45:27.209839
----------------------------------------
2025-Nov-22 17:45:27.228222
⚠️ NIXPACKS_NODE_VERSION not set. Nixpacks will use Node.js 18 by default, which is EOL.
2025-Nov-22 17:45:27.240413
You can override this by setting NIXPACKS_NODE_VERSION=22 in your environment variables.
2025-Nov-22 17:45:27.250116
Final Nixpacks plan: {
2025-Nov-22 17:45:27.250116
"providers": [],
2025-Nov-22 17:45:27.250116
"buildImage": "ghcr.io\/railwayapp\/nixpacks:ubuntu-1745885067",
2025-Nov-22 17:45:27.250116
"variables": {
2025-Nov-22 17:45:27.250116
"CI": "true",
2025-Nov-22 17:45:27.250116
"COOLIFY_BRANCH": "main",
2025-Nov-22 17:45:27.250116
"COOLIFY_CONTAINER_NAME": "ygcggosc4k4wg04ck8k08w8s-174515852765",
2025-Nov-22 17:45:27.250116
"COOLIFY_FQDN": "ia-recrutement-pro.be2web.fr",
2025-Nov-22 17:45:27.250116
"COOLIFY_RESOURCE_UUID": "ygcggosc4k4wg04ck8k08w8s",
2025-Nov-22 17:45:27.250116
"COOLIFY_URL": "https:\/\/ia-recrutement-pro.be2web.fr",
2025-Nov-22 17:45:27.250116
"NIXPACKS_METADATA": "node",
2025-Nov-22 17:45:27.250116
"NODE_ENV": "production",
2025-Nov-22 17:45:27.250116
"NPM_CONFIG_PRODUCTION": "false",
2025-Nov-22 17:45:27.250116
"SOURCE_COMMIT": "4fe3da8f7fdd6f4e2979e68234e14e881250606c",
2025-Nov-22 17:45:27.250116
"NEXT_PUBLIC_BASE_URL": "https:\/\/ia-recrutement-pro.be2web.fr\/",
2025-Nov-22 17:45:27.250116
"NEXT_PUBLIC_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxZHR0bmFnZHpuZGxwdmRhcnlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3ODYzNjUsImV4cCI6MjA3MTM2MjM2NX0.HEmw-EWietIVX5uKpSCpEGZ4YPS4odLkg2O9gJN13TY",
2025-Nov-22 17:45:27.250116
"NEXT_PUBLIC_SUPABASE_URL": "https:\/\/lqdttnagdzndlpvdaryj.supabase.co",
2025-Nov-22 17:45:27.250116
"NEXTAUTH_SECRET": "8k9mN2pQ7rS4tU6vW8xY0zA1bC3dE5fG7hI9jK2lM4nO6pQ8rS0tU2vW4xY6zA8bC0dE2fG4hI6jK8lM0nO2pQ4rS6tU8vW0xY2zA4bC6dE8fG0hI2jK4lM6nO8pQ0rS2tU4vW6xY8zA0bC2dE4fG6hI8jK0lM2nO4pQ6rS8tU0vW2xY4zA6bC8dE0fG2hI4jK6lM8nO0pQ2rS4tU6vW8xY0zA2bC4dE6fG8hI0jK2lM4nO6pQ8rS0tU2vW4xY6zA8bC0dE2fG4hI6jK8lM0nO2pQ4rS6tU8vW0xY2zA4",
2025-Nov-22 17:45:27.250116
"NEXTAUTH_URL": "https:\/\/ia-recrutement-pro.be2web.fr",
2025-Nov-22 17:45:27.250116
"SMTP_PASSWORD": "Maxime%9524",
2025-Nov-22 17:45:27.250116
"SMTP_SECURE": "true",
2025-Nov-22 17:45:27.250116
"SUPABASE_SERVICE_ROLE_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxZHR0bmFnZHpuZGxwdmRhcnlqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTc4NjM2NSwiZXhwIjoyMDcxMzYyMzY1fQ.lEOLH0N71wO6OX9QS7WfUh4q5aGVdkYBk3weiYv5ue8"
2025-Nov-22 17:45:27.250116
},
2025-Nov-22 17:45:27.250116
"phases": {
2025-Nov-22 17:45:27.250116
"build": {
2025-Nov-22 17:45:27.250116
"dependsOn": [
2025-Nov-22 17:45:27.250116
"install"
2025-Nov-22 17:45:27.250116
],
2025-Nov-22 17:45:27.250116
"cmds": [
2025-Nov-22 17:45:27.250116
"yarn run build"
2025-Nov-22 17:45:27.250116
],
2025-Nov-22 17:45:27.250116
"cacheDirectories": [
2025-Nov-22 17:45:27.250116
".next\/cache",
2025-Nov-22 17:45:27.250116
"node_modules\/.cache"
2025-Nov-22 17:45:27.250116
]
2025-Nov-22 17:45:27.250116
},
2025-Nov-22 17:45:27.250116
"install": {
2025-Nov-22 17:45:27.250116
"dependsOn": [
2025-Nov-22 17:45:27.250116
"setup"
2025-Nov-22 17:45:27.250116
],
2025-Nov-22 17:45:27.250116
"cmds": [
2025-Nov-22 17:45:27.250116
"yarn install --frozen-lockfile"
2025-Nov-22 17:45:27.250116
],
2025-Nov-22 17:45:27.250116
"cacheDirectories": [
2025-Nov-22 17:45:27.250116
"\/usr\/local\/share\/.cache\/yarn\/v6"
2025-Nov-22 17:45:27.250116
],
2025-Nov-22 17:45:27.250116
"paths": [
2025-Nov-22 17:45:27.250116
"\/app\/node_modules\/.bin"
2025-Nov-22 17:45:27.250116
]
2025-Nov-22 17:45:27.250116
},
2025-Nov-22 17:45:27.250116
"setup": {
2025-Nov-22 17:45:27.250116
"nixPkgs": [
2025-Nov-22 17:45:27.250116
"nodejs_24",
2025-Nov-22 17:45:27.250116
"yarn-1_x"
2025-Nov-22 17:45:27.250116
],
2025-Nov-22 17:45:27.250116
"nixLibs": [
2025-Nov-22 17:45:27.250116
"gcc-unwrapped"
2025-Nov-22 17:45:27.250116
],
2025-Nov-22 17:45:27.250116
"nixOverlays": [
2025-Nov-22 17:45:27.250116
"https:\/\/github.com\/railwayapp\/nix-npm-overlay\/archive\/main.tar.gz"
2025-Nov-22 17:45:27.250116
],
2025-Nov-22 17:45:27.250116
"nixpkgsArchive": "23f9169c4ccce521379e602cc82ed873a1f1b52b",
2025-Nov-22 17:45:27.250116
"aptPkgs": [
2025-Nov-22 17:45:27.250116
"curl",
2025-Nov-22 17:45:27.250116
"wget"
2025-Nov-22 17:45:27.250116
]
2025-Nov-22 17:45:27.250116
}
2025-Nov-22 17:45:27.250116
},
2025-Nov-22 17:45:27.250116
"start": {
2025-Nov-22 17:45:27.250116
"cmd": "yarn run start"
2025-Nov-22 17:45:27.250116
}
2025-Nov-22 17:45:27.250116
}
2025-Nov-22 17:45:28.434176
Creating build-time .env file in /artifacts (outside Docker context).
2025-Nov-22 17:45:29.245591
[CMD]: docker exec m8w0sksw4sokc0oksgc00080 bash -c 'cat /artifacts/build-time.env'
2025-Nov-22 17:45:29.245591
SOURCE_COMMIT='4fe3da8f7fdd6f4e2979e68234e14e881250606c'
2025-Nov-22 17:45:29.245591
COOLIFY_URL='https://ia-recrutement-pro.be2web.fr'
2025-Nov-22 17:45:29.245591
COOLIFY_FQDN='ia-recrutement-pro.be2web.fr'
2025-Nov-22 17:45:29.245591
COOLIFY_BRANCH='main'
2025-Nov-22 17:45:29.245591
COOLIFY_RESOURCE_UUID='ygcggosc4k4wg04ck8k08w8s'
2025-Nov-22 17:45:29.245591
COOLIFY_CONTAINER_NAME='ygcggosc4k4wg04ck8k08w8s-174515852765'
2025-Nov-22 17:45:29.245591
NEXT_PUBLIC_BASE_URL="https://ia-recrutement-pro.be2web.fr/"
2025-Nov-22 17:45:29.245591
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxZHR0bmFnZHpuZGxwdmRhcnlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3ODYzNjUsImV4cCI6MjA3MTM2MjM2NX0.HEmw-EWietIVX5uKpSCpEGZ4YPS4odLkg2O9gJN13TY"
2025-Nov-22 17:45:29.245591
NEXT_PUBLIC_SUPABASE_URL="https://lqdttnagdzndlpvdaryj.supabase.co"
2025-Nov-22 17:45:29.245591
NEXTAUTH_SECRET="8k9mN2pQ7rS4tU6vW8xY0zA1bC3dE5fG7hI9jK2lM4nO6pQ8rS0tU2vW4xY6zA8bC0dE2fG4hI6jK8lM0nO2pQ4rS6tU8vW0xY2zA4bC6dE8fG0hI2jK4lM6nO8pQ0rS2tU4vW6xY8zA0bC2dE4fG6hI8jK0lM2nO4pQ6rS8tU0vW2xY4zA6bC8dE0fG2hI4jK6lM8nO0pQ2rS4tU6vW8xY0zA2bC4dE6fG8hI0jK2lM4nO6pQ8rS0tU2vW4xY6zA8bC0dE2fG4hI6jK8lM0nO2pQ4rS6tU8vW0xY2zA4"
2025-Nov-22 17:45:29.245591
NEXTAUTH_URL="https://ia-recrutement-pro.be2web.fr"
2025-Nov-22 17:45:29.245591
NODE_ENV="production"
2025-Nov-22 17:45:29.245591
SMTP_PASSWORD="Maxime%9524"
2025-Nov-22 17:45:29.245591
SMTP_SECURE="true"
2025-Nov-22 17:45:29.245591
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxZHR0bmFnZHpuZGxwdmRhcnlqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTc4NjM2NSwiZXhwIjoyMDcxMzYyMzY1fQ.lEOLH0N71wO6OX9QS7WfUh4q5aGVdkYBk3weiYv5ue8"
2025-Nov-22 17:45:29.263458
----------------------------------------
2025-Nov-22 17:45:29.278795
⚠️ Build-time environment variable warning: NODE_ENV=production
2025-Nov-22 17:45:29.291702
Affects: Node.js/npm/yarn/bun/pnpm
2025-Nov-22 17:45:29.303839
Issue: Skips devDependencies installation which are often required for building (webpack, typescript, etc.)
2025-Nov-22 17:45:29.315750
Recommendation: Uncheck "Available at Buildtime" or use "development" during build
2025-Nov-22 17:45:29.328769
2025-Nov-22 17:45:29.341435
💡 Tips to resolve build issues:
2025-Nov-22 17:45:29.351513
1. Set these variables as "Runtime only" in the environment variables settings
2025-Nov-22 17:45:29.362535
2. Use different values for build-time (e.g., NODE_ENV=development for build)
2025-Nov-22 17:45:29.371952
3. Consider using multi-stage Docker builds to separate build and runtime environments
2025-Nov-22 17:45:29.391102
----------------------------------------
2025-Nov-22 17:45:29.402519
Building docker image started.
2025-Nov-22 17:45:29.418878
To check the current progress, click on Show Debug Logs.
2025-Nov-22 17:45:30.427979
[CMD]: docker exec m8w0sksw4sokc0oksgc00080 bash -c 'nixpacks build -c /artifacts/thegameplan.json --cache-key 'ygcggosc4k4wg04ck8k08w8s' --no-error-without-start -n ygcggosc4k4wg04ck8k08w8s:4fe3da8f7fdd6f4e2979e68234e14e881250606c /artifacts/m8w0sksw4sokc0oksgc00080 -o /artifacts/m8w0sksw4sokc0oksgc00080'
2025-Nov-22 17:45:30.427979
2025-Nov-22 17:45:30.427979
╔══════════════ Nixpacks v1.41.0 ══════════════╗
2025-Nov-22 17:45:30.427979
║ setup      │ nodejs_24, yarn-1_x, curl, wget ║
2025-Nov-22 17:45:30.427979
║──────────────────────────────────────────────║
2025-Nov-22 17:45:30.427979
║ install    │ yarn install --frozen-lockfile  ║
2025-Nov-22 17:45:30.427979
║──────────────────────────────────────────────║
2025-Nov-22 17:45:30.427979
║ build      │ yarn run build                  ║
2025-Nov-22 17:45:30.427979
║──────────────────────────────────────────────║
2025-Nov-22 17:45:30.427979
║ start      │ yarn run start                  ║
2025-Nov-22 17:45:30.427979
╚══════════════════════════════════════════════╝
2025-Nov-22 17:45:30.447599
Saved output to:
2025-Nov-22 17:45:30.447599
/artifacts/m8w0sksw4sokc0oksgc00080
2025-Nov-22 17:45:30.828348
[CMD]: docker exec m8w0sksw4sokc0oksgc00080 bash -c 'cat /artifacts/m8w0sksw4sokc0oksgc00080/.nixpacks/Dockerfile'
2025-Nov-22 17:45:30.828348
FROM ghcr.io/railwayapp/nixpacks:ubuntu-1745885067
2025-Nov-22 17:45:30.828348
2025-Nov-22 17:45:30.828348
ENTRYPOINT ["/bin/bash", "-l", "-c"]
2025-Nov-22 17:45:30.828348
WORKDIR /app/
2025-Nov-22 17:45:30.828348
2025-Nov-22 17:45:30.828348
2025-Nov-22 17:45:30.828348
COPY .nixpacks/nixpkgs-23f9169c4ccce521379e602cc82ed873a1f1b52b.nix .nixpacks/nixpkgs-23f9169c4ccce521379e602cc82ed873a1f1b52b.nix
2025-Nov-22 17:45:30.828348
RUN nix-env -if .nixpacks/nixpkgs-23f9169c4ccce521379e602cc82ed873a1f1b52b.nix && nix-collect-garbage -d
2025-Nov-22 17:45:30.828348
RUN sudo apt-get update && sudo apt-get install -y --no-install-recommends curl wget
2025-Nov-22 17:45:30.828348
2025-Nov-22 17:45:30.828348
ARG CI COOLIFY_BRANCH COOLIFY_CONTAINER_NAME COOLIFY_FQDN COOLIFY_RESOURCE_UUID COOLIFY_URL NEXTAUTH_SECRET NEXTAUTH_URL NEXT_PUBLIC_BASE_URL NEXT_PUBLIC_SUPABASE_ANON_KEY NEXT_PUBLIC_SUPABASE_URL NIXPACKS_METADATA NODE_ENV NPM_CONFIG_PRODUCTION SMTP_PASSWORD SMTP_SECURE SOURCE_COMMIT SUPABASE_SERVICE_ROLE_KEY
2025-Nov-22 17:45:30.828348
ENV CI=$CI COOLIFY_BRANCH=$COOLIFY_BRANCH COOLIFY_CONTAINER_NAME=$COOLIFY_CONTAINER_NAME COOLIFY_FQDN=$COOLIFY_FQDN COOLIFY_RESOURCE_UUID=$COOLIFY_RESOURCE_UUID COOLIFY_URL=$COOLIFY_URL NEXTAUTH_SECRET=$NEXTAUTH_SECRET NEXTAUTH_URL=$NEXTAUTH_URL NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL NIXPACKS_METADATA=$NIXPACKS_METADATA NODE_ENV=$NODE_ENV NPM_CONFIG_PRODUCTION=$NPM_CONFIG_PRODUCTION SMTP_PASSWORD=$SMTP_PASSWORD SMTP_SECURE=$SMTP_SECURE SOURCE_COMMIT=$SOURCE_COMMIT SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_ROLE_KEY
2025-Nov-22 17:45:30.828348
2025-Nov-22 17:45:30.828348
# setup phase
2025-Nov-22 17:45:30.828348
# noop
2025-Nov-22 17:45:30.828348
2025-Nov-22 17:45:30.828348
# install phase
2025-Nov-22 17:45:30.828348
ENV NIXPACKS_PATH=/app/node_modules/.bin:$NIXPACKS_PATH
2025-Nov-22 17:45:30.828348
COPY . /app/.
2025-Nov-22 17:45:30.828348
RUN --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-/usr/local/share/cache/yarn/v6,target=/usr/local/share/.cache/yarn/v6 yarn install --frozen-lockfile
2025-Nov-22 17:45:30.828348
2025-Nov-22 17:45:30.828348
# build phase
2025-Nov-22 17:45:30.828348
COPY . /app/.
2025-Nov-22 17:45:30.828348
RUN --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-next/cache,target=/app/.next/cache --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-node_modules/cache,target=/app/node_modules/.cache yarn run build
2025-Nov-22 17:45:30.828348
2025-Nov-22 17:45:30.828348
2025-Nov-22 17:45:30.828348
RUN printf '\nPATH=/app/node_modules/.bin:$PATH' >> /root/.profile
2025-Nov-22 17:45:30.828348
2025-Nov-22 17:45:30.828348
2025-Nov-22 17:45:30.828348
# start
2025-Nov-22 17:45:30.828348
COPY . /app
2025-Nov-22 17:45:30.828348
2025-Nov-22 17:45:30.828348
CMD ["yarn run start"]
2025-Nov-22 17:45:31.624502
[CMD]: docker exec m8w0sksw4sokc0oksgc00080 bash -c 'cat /artifacts/build.sh'
2025-Nov-22 17:45:31.624502
cd /artifacts/m8w0sksw4sokc0oksgc00080 && set -a && source /artifacts/build-time.env && set +a && docker build --add-host ckso4o8w888wkg8ggk0wc8sw:10.0.1.7 --add-host coolify:10.0.1.3 --add-host coolify-db:10.0.1.4 --add-host coolify-realtime:10.0.1.8 --add-host coolify-redis:10.0.1.10 --network host -f /artifacts/m8w0sksw4sokc0oksgc00080/.nixpacks/Dockerfile --progress plain -t ygcggosc4k4wg04ck8k08w8s:4fe3da8f7fdd6f4e2979e68234e14e881250606c --build-arg CI --build-arg COOLIFY_BRANCH --build-arg COOLIFY_CONTAINER_NAME --build-arg COOLIFY_FQDN --build-arg COOLIFY_RESOURCE_UUID --build-arg COOLIFY_URL --build-arg NIXPACKS_METADATA --build-arg NODE_ENV --build-arg NPM_CONFIG_PRODUCTION --build-arg SOURCE_COMMIT --build-arg NEXT_PUBLIC_BASE_URL --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY --build-arg NEXT_PUBLIC_SUPABASE_URL --build-arg NEXTAUTH_SECRET --build-arg NEXTAUTH_URL --build-arg SMTP_PASSWORD --build-arg SMTP_SECURE --build-arg SUPABASE_SERVICE_ROLE_KEY --build-arg COOLIFY_BUILD_SECRETS_HASH=b34ab6ea6594e65da030ac3f42238c3075987d8802d66c3469e4dab176c9bb18 --build-arg 'SOURCE_COMMIT' --build-arg 'COOLIFY_URL' --build-arg 'COOLIFY_FQDN' --build-arg 'COOLIFY_BRANCH' --build-arg 'COOLIFY_RESOURCE_UUID' --build-arg 'COOLIFY_CONTAINER_NAME' /artifacts/m8w0sksw4sokc0oksgc00080
2025-Nov-22 17:45:32.521264
[CMD]: docker exec m8w0sksw4sokc0oksgc00080 bash -c 'bash /artifacts/build.sh'
2025-Nov-22 17:45:32.521264
#0 building with "default" instance using docker driver
2025-Nov-22 17:45:32.521264
2025-Nov-22 17:45:32.521264
#1 [internal] load build definition from Dockerfile
2025-Nov-22 17:45:32.521264
#1 transferring dockerfile: 2.02kB done
2025-Nov-22 17:45:32.521264
#1 DONE 0.0s
2025-Nov-22 17:45:32.521264
2025-Nov-22 17:45:32.521264
#2 [internal] load metadata for ghcr.io/railwayapp/nixpacks:ubuntu-1745885067
2025-Nov-22 17:45:32.674748
#2 DONE 0.3s
2025-Nov-22 17:45:32.797597
#3 [internal] load .dockerignore
2025-Nov-22 17:45:32.797597
#3 transferring context: 2B done
2025-Nov-22 17:45:32.797597
#3 DONE 0.0s
2025-Nov-22 17:45:32.797597
2025-Nov-22 17:45:32.797597
#4 [stage-0  1/11] FROM ghcr.io/railwayapp/nixpacks:ubuntu-1745885067@sha256:d45c89d80e13d7ad0fd555b5130f22a866d9dd10e861f589932303ef2314c7de
2025-Nov-22 17:45:32.797597
#4 DONE 0.0s
2025-Nov-22 17:45:32.797597
2025-Nov-22 17:45:32.797597
#5 [internal] load build context
2025-Nov-22 17:45:32.797597
#5 transferring context: 3.41MB 0.1s done
2025-Nov-22 17:45:33.037567
#5 DONE 0.1s
2025-Nov-22 17:45:33.037567
2025-Nov-22 17:45:33.037567
#6 [stage-0  2/11] WORKDIR /app/
2025-Nov-22 17:45:33.037567
#6 CACHED
2025-Nov-22 17:45:33.037567
2025-Nov-22 17:45:33.037567
#7 [stage-0  3/11] COPY .nixpacks/nixpkgs-23f9169c4ccce521379e602cc82ed873a1f1b52b.nix .nixpacks/nixpkgs-23f9169c4ccce521379e602cc82ed873a1f1b52b.nix
2025-Nov-22 17:45:33.037567
#7 CACHED
2025-Nov-22 17:45:33.037567
2025-Nov-22 17:45:33.037567
#8 [stage-0  4/11] RUN nix-env -if .nixpacks/nixpkgs-23f9169c4ccce521379e602cc82ed873a1f1b52b.nix && nix-collect-garbage -d
2025-Nov-22 17:45:33.037567
#8 CACHED
2025-Nov-22 17:45:33.037567
2025-Nov-22 17:45:33.037567
#9 [stage-0  5/11] RUN sudo apt-get update && sudo apt-get install -y --no-install-recommends curl wget
2025-Nov-22 17:45:33.037567
#9 CACHED
2025-Nov-22 17:45:33.037567
2025-Nov-22 17:45:33.037567
#10 [stage-0  6/11] COPY . /app/.
2025-Nov-22 17:45:33.037567
#10 DONE 0.1s
2025-Nov-22 17:45:33.037567
2025-Nov-22 17:45:33.037567
#11 [stage-0  7/11] RUN --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-/usr/local/share/cache/yarn/v6,target=/usr/local/share/.cache/yarn/v6 yarn install --frozen-lockfile
2025-Nov-22 17:45:33.499083
#11 0.612 yarn install v1.22.22
2025-Nov-22 17:45:33.600003
#11 0.714 [1/5] Validating package.json...
2025-Nov-22 17:45:33.757271
#11 0.720 [2/5] Resolving packages...
2025-Nov-22 17:45:33.900234
#11 1.011 (node:1) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.
2025-Nov-22 17:45:33.900234
#11 1.011 (Use `node --trace-deprecation ...` to show where the warning was created)
2025-Nov-22 17:45:34.051359
#11 1.014 [3/5] Fetching packages...
2025-Nov-22 17:45:34.426216
#11 1.539 [4/5] Linking dependencies...
2025-Nov-22 17:45:34.622688
#11 1.577 warning Workspaces can only be enabled in private projects.
2025-Nov-22 17:45:34.622688
#11 1.582 warning Workspaces can only be enabled in private projects.
2025-Nov-22 17:45:39.865614
#11 6.977 [5/5] Building fresh packages...
2025-Nov-22 17:45:40.061390
#11 7.175 Done in 6.58s.
2025-Nov-22 17:45:40.244991
#11 DONE 7.4s
2025-Nov-22 17:45:40.497048
#12 [stage-0  8/11] COPY . /app/.
2025-Nov-22 17:45:40.497048
#12 DONE 0.1s
2025-Nov-22 17:45:40.497048
2025-Nov-22 17:45:40.497048
#13 [stage-0  9/11] RUN --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-next/cache,target=/app/.next/cache --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-node_modules/cache,target=/app/node_modules/.cache yarn run build
2025-Nov-22 17:45:40.748738
#13 0.405 yarn run v1.22.22
2025-Nov-22 17:45:40.974643
#13 0.455 $ ls -R src && next build
2025-Nov-22 17:45:40.974643
#13 0.480 src:
2025-Nov-22 17:45:40.974643
#13 0.480 app
2025-Nov-22 17:45:40.974643
#13 0.480 components
2025-Nov-22 17:45:40.974643
#13 0.480 lib
2025-Nov-22 17:45:40.974643
#13 0.480 middleware.ts
2025-Nov-22 17:45:40.974643
#13 0.480
2025-Nov-22 17:45:40.974643
#13 0.480 src/app:
2025-Nov-22 17:45:40.974643
#13 0.480 about
2025-Nov-22 17:45:40.974643
#13 0.480 admin
2025-Nov-22 17:45:40.974643
#13 0.480 api
2025-Nov-22 17:45:40.974643
#13 0.480 favicon.ico
2025-Nov-22 17:45:40.974643
#13 0.480 globals.css
2025-Nov-22 17:45:40.974643
#13 0.480 layout.tsx
2025-Nov-22 17:45:40.974643
#13 0.480 page.tsx
2025-Nov-22 17:45:40.974643
#13 0.480 recruiter-results
2025-Nov-22 17:45:40.974643
#13 0.480 services
2025-Nov-22 17:45:40.974643
#13 0.480
2025-Nov-22 17:45:40.974643
#13 0.480 src/app/about:
2025-Nov-22 17:45:40.974643
#13 0.480 page.tsx
2025-Nov-22 17:45:40.974643
#13 0.480
2025-Nov-22 17:45:40.974643
#13 0.480 src/app/admin:
2025-Nov-22 17:45:40.974643
#13 0.480 page.tsx
2025-Nov-22 17:45:40.974643
#13 0.480
2025-Nov-22 17:45:40.974643
#13 0.480 src/app/api:
2025-Nov-22 17:45:40.974643
#13 0.480 analysis
2025-Nov-22 17:45:40.974643
#13 0.480 analytics
2025-Nov-22 17:45:40.974643
#13 0.480 analyze
2025-Nov-22 17:45:40.974643
#13 0.480 auth
2025-Nov-22 17:45:40.974643
#13 0.480 send-email
2025-Nov-22 17:45:40.974643
#13 0.480
2025-Nov-22 17:45:40.974643
#13 0.480 src/app/api/analysis:
2025-Nov-22 17:45:40.974643
#13 0.480 check-limits
2025-Nov-22 17:45:40.974643
#13 0.480 increment-counters
2025-Nov-22 17:45:40.974643
#13 0.480
2025-Nov-22 17:45:40.974643
#13 0.480 src/app/api/analysis/check-limits:
2025-Nov-22 17:45:40.974643
#13 0.480 route.ts
2025-Nov-22 17:45:40.974643
#13 0.480
2025-Nov-22 17:45:40.974643
#13 0.480 src/app/api/analysis/increment-counters:
2025-Nov-22 17:45:40.974643
#13 0.480 route.ts
2025-Nov-22 17:45:40.974643
#13 0.480
2025-Nov-22 17:45:40.974643
#13 0.480 src/app/api/analytics:
2025-Nov-22 17:45:40.974643
#13 0.480 route.ts
2025-Nov-22 17:45:40.974643
#13 0.480
2025-Nov-22 17:45:40.974643
#13 0.480 src/app/api/analyze:
2025-Nov-22 17:45:40.974643
#13 0.480 route.ts
2025-Nov-22 17:45:40.974643
#13 0.480
2025-Nov-22 17:45:40.974643
#13 0.480 src/app/api/auth:
2025-Nov-22 17:45:40.974643
#13 0.480 send-verification-code
2025-Nov-22 17:45:40.974643
#13 0.480 validate-session
2025-Nov-22 17:45:40.974643
#13 0.480 verify-code
2025-Nov-22 17:45:40.974643
#13 0.480
2025-Nov-22 17:45:40.974643
#13 0.480 src/app/api/auth/send-verification-code:
2025-Nov-22 17:45:40.974643
#13 0.480 route.ts
2025-Nov-22 17:45:40.974643
#13 0.480
2025-Nov-22 17:45:40.974643
#13 0.480 src/app/api/auth/validate-session:
2025-Nov-22 17:45:40.974643
#13 0.480 route.ts
2025-Nov-22 17:45:40.974643
#13 0.480
2025-Nov-22 17:45:40.974643
#13 0.480 src/app/api/auth/verify-code:
2025-Nov-22 17:45:40.974643
#13 0.480 route.ts
2025-Nov-22 17:45:40.974643
#13 0.480
2025-Nov-22 17:45:40.974643
#13 0.480 src/app/api/send-email:
2025-Nov-22 17:45:40.974643
#13 0.480 route.ts
2025-Nov-22 17:45:40.974643
#13 0.480
2025-Nov-22 17:45:40.974643
#13 0.480 src/app/recruiter-results:
2025-Nov-22 17:45:40.974643
#13 0.480 json.md
2025-Nov-22 17:45:40.974643
#13 0.480 layout.tsx
2025-Nov-22 17:45:40.974643
#13 0.480 page.tsx
2025-Nov-22 17:45:40.974643
#13 0.480
2025-Nov-22 17:45:40.974643
#13 0.480 src/app/services:
2025-Nov-22 17:45:40.974643
#13 0.480 ia
2025-Nov-22 17:45:40.974643
#13 0.480
2025-Nov-22 17:45:40.974643
#13 0.480 src/app/services/ia:
2025-Nov-22 17:45:40.974643
#13 0.480 page.tsx
2025-Nov-22 17:45:40.974643
#13 0.480
2025-Nov-22 17:45:40.974643
#13 0.480 src/components:
2025-Nov-22 17:45:40.974643
#13 0.480 auth
2025-Nov-22 17:45:40.974643
#13 0.480 layout
2025-Nov-22 17:45:40.974643
#13 0.480 sections
2025-Nov-22 17:45:40.974643
#13 0.480 ui
2025-Nov-22 17:45:40.974643
#13 0.480 whitelist-manager.tsx
2025-Nov-22 17:45:40.974643
#13 0.480
2025-Nov-22 17:45:40.974643
#13 0.480 src/components/auth:
2025-Nov-22 17:45:40.974643
#13 0.480 email-verification-popup.tsx
2025-Nov-22 17:45:40.974643
#13 0.480
2025-Nov-22 17:45:40.974643
#13 0.480 src/components/layout:
2025-Nov-22 17:45:40.974643
#13 0.480 footer.tsx
2025-Nov-22 17:45:40.974643
#13 0.480 header.tsx
2025-Nov-22 17:45:40.974643
#13 0.480
2025-Nov-22 17:45:40.974643
#13 0.480 src/components/sections:
2025-Nov-22 17:45:40.974643
#13 0.480 features.tsx
2025-Nov-22 17:45:40.974643
#13 0.480 hero.tsx
2025-Nov-22 17:45:40.974643
#13 0.480 upload-zone.tsx
2025-Nov-22 17:45:40.974643
#13 0.480
2025-Nov-22 17:45:40.974643
#13 0.480 src/components/ui:
2025-Nov-22 17:45:40.974643
#13 0.480 animation-background.tsx
2025-Nov-22 17:45:40.974643
#13 0.480 badge.tsx
2025-Nov-22 17:45:40.974643
#13 0.480 button.tsx
2025-Nov-22 17:45:40.974643
#13 0.480 card.tsx
2025-Nov-22 17:45:40.974643
#13 0.480 contact-popup.tsx
2025-Nov-22 17:45:40.974643
#13 0.480 dialog.tsx
2025-Nov-22 17:45:40.974643
#13 0.480 gdpr-popup.tsx
2025-Nov-22 17:45:40.974643
#13 0.480 hero-banner.tsx
2025-Nov-22 17:45:40.974643
#13 0.480 input.tsx
2025-Nov-22 17:45:40.974643
#13 0.480 label.tsx
2025-Nov-22 17:45:40.974643
#13 0.480 particle-background.tsx
2025-Nov-22 17:45:40.974643
#13 0.480 rate-limit-popup.tsx
2025-Nov-22 17:45:40.974643
#13 0.480 textarea.tsx
2025-Nov-22 17:45:40.974643
#13 0.480
2025-Nov-22 17:45:40.974643
#13 0.480 src/lib:
2025-Nov-22 17:45:40.974643
#13 0.480 ai-service.ts
2025-Nov-22 17:45:40.974643
#13 0.480 analytics.ts
2025-Nov-22 17:45:40.974643
#13 0.480 auth-service.ts
2025-Nov-22 17:45:40.974643
#13 0.480 cache-cleaner.ts
2025-Nov-22 17:45:40.974643
#13 0.480 constants.ts
2025-Nov-22 17:45:40.974643
#13 0.480 disposable-email-detector.ts
2025-Nov-22 17:45:40.974643
#13 0.480 rate-limit-service.ts
2025-Nov-22 17:45:40.974643
#13 0.480 supabase.ts
2025-Nov-22 17:45:40.974643
#13 0.480 utils.ts
2025-Nov-22 17:45:41.913812
#13 1.570    ▲ Next.js 15.3.4
2025-Nov-22 17:45:42.104696
#13 1.571
2025-Nov-22 17:45:42.104696
#13 1.611    Creating an optimized production build ...
2025-Nov-22 17:45:51.531127
#13 11.18 Failed to compile.
2025-Nov-22 17:45:51.531127
#13 11.18
2025-Nov-22 17:45:51.680342
#13 11.19 ./src/app/about/page.tsx
2025-Nov-22 17:45:51.680342
#13 11.19 Module not found: Can't resolve '@/components/ui/button'
2025-Nov-22 17:45:51.680342
#13 11.19
2025-Nov-22 17:45:51.680342
#13 11.19 https://nextjs.org/docs/messages/module-not-found
2025-Nov-22 17:45:51.680342
#13 11.19
2025-Nov-22 17:45:51.680342
#13 11.19 ./src/app/about/page.tsx
2025-Nov-22 17:45:51.680342
#13 11.19 Module not found: Can't resolve '@/components/ui/card'
2025-Nov-22 17:45:51.680342
#13 11.19
2025-Nov-22 17:45:51.680342
#13 11.19 https://nextjs.org/docs/messages/module-not-found
2025-Nov-22 17:45:51.680342
#13 11.19
2025-Nov-22 17:45:51.680342
#13 11.19 ./src/app/about/page.tsx
2025-Nov-22 17:45:51.680342
#13 11.19 Module not found: Can't resolve '@/components/ui/badge'
2025-Nov-22 17:45:51.680342
#13 11.19
2025-Nov-22 17:45:51.680342
#13 11.19 https://nextjs.org/docs/messages/module-not-found
2025-Nov-22 17:45:51.680342
#13 11.19
2025-Nov-22 17:45:51.680342
#13 11.19 ./src/app/about/page.tsx
2025-Nov-22 17:45:51.680342
#13 11.19 Module not found: Can't resolve '@/components/ui/contact-popup'
2025-Nov-22 17:45:51.680342
#13 11.19
2025-Nov-22 17:45:51.680342
#13 11.19 https://nextjs.org/docs/messages/module-not-found
2025-Nov-22 17:45:51.680342
#13 11.19
2025-Nov-22 17:45:51.680342
#13 11.19 ./src/app/about/page.tsx
2025-Nov-22 17:45:51.680342
#13 11.19 Module not found: Can't resolve '@/components/auth/email-verification-popup'
2025-Nov-22 17:45:51.680342
#13 11.19
2025-Nov-22 17:45:51.680342
#13 11.19 https://nextjs.org/docs/messages/module-not-found
2025-Nov-22 17:45:51.680342
#13 11.19
2025-Nov-22 17:45:51.680342
#13 11.21
2025-Nov-22 17:45:51.680342
#13 11.21 > Build failed because of webpack errors
2025-Nov-22 17:45:51.680342
#13 11.25 error Command failed with exit code 1.
2025-Nov-22 17:45:51.680342
#13 11.25 info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
2025-Nov-22 17:45:51.680342
#13 ERROR: process "/bin/bash -ol pipefail -c yarn run build" did not complete successfully: exit code: 1
2025-Nov-22 17:45:51.764924
------
2025-Nov-22 17:45:51.764924
> [stage-0  9/11] RUN --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-next/cache,target=/app/.next/cache --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-node_modules/cache,target=/app/node_modules/.cache yarn run build:
2025-Nov-22 17:45:51.764924
11.19
2025-Nov-22 17:45:51.764924
11.19 ./src/app/about/page.tsx
2025-Nov-22 17:45:51.764924
11.19 Module not found: Can't resolve '@/components/auth/email-verification-popup'
2025-Nov-22 17:45:51.764924
11.19
2025-Nov-22 17:45:51.764924
11.19 https://nextjs.org/docs/messages/module-not-found
2025-Nov-22 17:45:51.764924
11.19
2025-Nov-22 17:45:51.764924
11.21
2025-Nov-22 17:45:51.764924
11.21 > Build failed because of webpack errors
2025-Nov-22 17:45:51.764924
11.25 error Command failed with exit code 1.
2025-Nov-22 17:45:51.764924
11.25 info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
2025-Nov-22 17:45:51.764924
------
2025-Nov-22 17:45:51.771580
9 warnings found (use docker --debug to expand):
2025-Nov-22 17:45:51.771580
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ARG "SMTP_PASSWORD") (line 11)
2025-Nov-22 17:45:51.771580
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ARG "SUPABASE_SERVICE_ROLE_KEY") (line 11)
2025-Nov-22 17:45:51.771580
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ENV "NEXTAUTH_SECRET") (line 12)
2025-Nov-22 17:45:51.771580
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ENV "SUPABASE_SERVICE_ROLE_KEY") (line 12)
2025-Nov-22 17:45:51.771580
- UndefinedVar: Usage of undefined variable '$NIXPACKS_PATH' (line 18)
2025-Nov-22 17:45:51.771580
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ARG "NEXTAUTH_SECRET") (line 11)
2025-Nov-22 17:45:51.771580
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ARG "NEXT_PUBLIC_SUPABASE_ANON_KEY") (line 11)
2025-Nov-22 17:45:51.771580
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ENV "NEXT_PUBLIC_SUPABASE_ANON_KEY") (line 12)
2025-Nov-22 17:45:51.771580
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ENV "SMTP_PASSWORD") (line 12)
2025-Nov-22 17:45:51.771580
Dockerfile:24
2025-Nov-22 17:45:51.771580
--------------------
2025-Nov-22 17:45:51.771580
22 |     # build phase
2025-Nov-22 17:45:51.771580
23 |     COPY . /app/.
2025-Nov-22 17:45:51.771580
24 | >>> RUN --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-next/cache,target=/app/.next/cache --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-node_modules/cache,target=/app/node_modules/.cache yarn run build
2025-Nov-22 17:45:51.771580
25 |
2025-Nov-22 17:45:51.771580
26 |
2025-Nov-22 17:45:51.771580
--------------------
2025-Nov-22 17:45:51.771580
ERROR: failed to build: failed to solve: process "/bin/bash -ol pipefail -c yarn run build" did not complete successfully: exit code: 1
2025-Nov-22 17:45:51.778196
exit status 1
2025-Nov-22 17:45:51.876070
Oops something is not okay, are you okay? 😢
2025-Nov-22 17:45:51.891392
#0 building with "default" instance using docker driver
2025-Nov-22 17:45:51.891392
2025-Nov-22 17:45:51.891392
#1 [internal] load build definition from Dockerfile
2025-Nov-22 17:45:51.891392
#1 transferring dockerfile: 2.02kB done
2025-Nov-22 17:45:51.891392
#1 DONE 0.0s
2025-Nov-22 17:45:51.891392
2025-Nov-22 17:45:51.891392
#2 [internal] load metadata for ghcr.io/railwayapp/nixpacks:ubuntu-1745885067
2025-Nov-22 17:45:51.891392
#2 DONE 0.3s
2025-Nov-22 17:45:51.891392
2025-Nov-22 17:45:51.891392
#3 [internal] load .dockerignore
2025-Nov-22 17:45:51.891392
#3 transferring context: 2B done
2025-Nov-22 17:45:51.891392
#3 DONE 0.0s
2025-Nov-22 17:45:51.891392
2025-Nov-22 17:45:51.891392
#4 [stage-0  1/11] FROM ghcr.io/railwayapp/nixpacks:ubuntu-1745885067@sha256:d45c89d80e13d7ad0fd555b5130f22a866d9dd10e861f589932303ef2314c7de
2025-Nov-22 17:45:51.891392
#4 DONE 0.0s
2025-Nov-22 17:45:51.891392
2025-Nov-22 17:45:51.891392
#5 [internal] load build context
2025-Nov-22 17:45:51.891392
#5 transferring context: 3.41MB 0.1s done
2025-Nov-22 17:45:51.891392
#5 DONE 0.1s
2025-Nov-22 17:45:51.891392
2025-Nov-22 17:45:51.891392
#6 [stage-0  2/11] WORKDIR /app/
2025-Nov-22 17:45:51.891392
#6 CACHED
2025-Nov-22 17:45:51.891392
2025-Nov-22 17:45:51.891392
#7 [stage-0  3/11] COPY .nixpacks/nixpkgs-23f9169c4ccce521379e602cc82ed873a1f1b52b.nix .nixpacks/nixpkgs-23f9169c4ccce521379e602cc82ed873a1f1b52b.nix
2025-Nov-22 17:45:51.891392
#7 CACHED
2025-Nov-22 17:45:51.891392
2025-Nov-22 17:45:51.891392
#8 [stage-0  4/11] RUN nix-env -if .nixpacks/nixpkgs-23f9169c4ccce521379e602cc82ed873a1f1b52b.nix && nix-collect-garbage -d
2025-Nov-22 17:45:51.891392
#8 CACHED
2025-Nov-22 17:45:51.891392
2025-Nov-22 17:45:51.891392
#9 [stage-0  5/11] RUN sudo apt-get update && sudo apt-get install -y --no-install-recommends curl wget
2025-Nov-22 17:45:51.891392
#9 CACHED
2025-Nov-22 17:45:51.891392
2025-Nov-22 17:45:51.891392
#10 [stage-0  6/11] COPY . /app/.
2025-Nov-22 17:45:51.891392
#10 DONE 0.1s
2025-Nov-22 17:45:51.891392
2025-Nov-22 17:45:51.891392
#11 [stage-0  7/11] RUN --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-/usr/local/share/cache/yarn/v6,target=/usr/local/share/.cache/yarn/v6 yarn install --frozen-lockfile
2025-Nov-22 17:45:51.891392
#11 0.612 yarn install v1.22.22
2025-Nov-22 17:45:51.891392
#11 0.714 [1/5] Validating package.json...
2025-Nov-22 17:45:51.891392
#11 0.720 [2/5] Resolving packages...
2025-Nov-22 17:45:51.891392
#11 1.011 (node:1) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.
2025-Nov-22 17:45:51.891392
#11 1.011 (Use `node --trace-deprecation ...` to show where the warning was created)
2025-Nov-22 17:45:51.891392
#11 1.014 [3/5] Fetching packages...
2025-Nov-22 17:45:51.891392
#11 1.539 [4/5] Linking dependencies...
2025-Nov-22 17:45:51.891392
#11 1.577 warning Workspaces can only be enabled in private projects.
2025-Nov-22 17:45:51.891392
#11 1.582 warning Workspaces can only be enabled in private projects.
2025-Nov-22 17:45:51.891392
#11 6.977 [5/5] Building fresh packages...
2025-Nov-22 17:45:51.891392
#11 7.175 Done in 6.58s.
2025-Nov-22 17:45:51.891392
#11 DONE 7.4s
2025-Nov-22 17:45:51.891392
2025-Nov-22 17:45:51.891392
#12 [stage-0  8/11] COPY . /app/.
2025-Nov-22 17:45:51.891392
#12 DONE 0.1s
2025-Nov-22 17:45:51.891392
2025-Nov-22 17:45:51.891392
#13 [stage-0  9/11] RUN --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-next/cache,target=/app/.next/cache --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-node_modules/cache,target=/app/node_modules/.cache yarn run build
2025-Nov-22 17:45:51.891392
#13 0.405 yarn run v1.22.22
2025-Nov-22 17:45:51.891392
#13 0.455 $ ls -R src && next build
2025-Nov-22 17:45:51.891392
#13 0.480 src:
2025-Nov-22 17:45:51.891392
#13 0.480 app
2025-Nov-22 17:45:51.891392
#13 0.480 components
2025-Nov-22 17:45:51.891392
#13 0.480 lib
2025-Nov-22 17:45:51.891392
#13 0.480 middleware.ts
2025-Nov-22 17:45:51.891392
#13 0.480
2025-Nov-22 17:45:51.891392
#13 0.480 src/app:
2025-Nov-22 17:45:51.891392
#13 0.480 about
2025-Nov-22 17:45:51.891392
#13 0.480 admin
2025-Nov-22 17:45:51.891392
#13 0.480 api
2025-Nov-22 17:45:51.891392
#13 0.480 favicon.ico
2025-Nov-22 17:45:51.891392
#13 0.480 globals.css
2025-Nov-22 17:45:51.891392
#13 0.480 layout.tsx
2025-Nov-22 17:45:51.891392
#13 0.480 page.tsx
2025-Nov-22 17:45:51.891392
#13 0.480 recruiter-results
2025-Nov-22 17:45:51.891392
#13 0.480 services
2025-Nov-22 17:45:51.891392
#13 0.480
2025-Nov-22 17:45:51.891392
#13 0.480 src/app/about:
2025-Nov-22 17:45:51.891392
#13 0.480 page.tsx
2025-Nov-22 17:45:51.891392
#13 0.480
2025-Nov-22 17:45:51.891392
#13 0.480 src/app/admin:
2025-Nov-22 17:45:51.891392
#13 0.480 page.tsx
2025-Nov-22 17:45:51.891392
#13 0.480
2025-Nov-22 17:45:51.891392
#13 0.480 src/app/api:
2025-Nov-22 17:45:51.891392
#13 0.480 analysis
2025-Nov-22 17:45:51.891392
#13 0.480 analytics
2025-Nov-22 17:45:51.891392
#13 0.480 analyze
2025-Nov-22 17:45:51.891392
#13 0.480 auth
2025-Nov-22 17:45:51.891392
#13 0.480 send-email
2025-Nov-22 17:45:51.891392
#13 0.480
2025-Nov-22 17:45:51.891392
#13 0.480 src/app/api/analysis:
2025-Nov-22 17:45:51.891392
#13 0.480 check-limits
2025-Nov-22 17:45:51.891392
#13 0.480 increment-counters
2025-Nov-22 17:45:51.891392
#13 0.480
2025-Nov-22 17:45:51.891392
#13 0.480 src/app/api/analysis/check-limits:
2025-Nov-22 17:45:51.891392
#13 0.480 route.ts
2025-Nov-22 17:45:51.891392
#13 0.480
2025-Nov-22 17:45:51.891392
#13 0.480 src/app/api/analysis/increment-counters:
2025-Nov-22 17:45:51.891392
#13 0.480 route.ts
2025-Nov-22 17:45:51.891392
#13 0.480
2025-Nov-22 17:45:51.891392
#13 0.480 src/app/api/analytics:
2025-Nov-22 17:45:51.891392
#13 0.480 route.ts
2025-Nov-22 17:45:51.891392
#13 0.480
2025-Nov-22 17:45:51.891392
#13 0.480 src/app/api/analyze:
2025-Nov-22 17:45:51.891392
#13 0.480 route.ts
2025-Nov-22 17:45:51.891392
#13 0.480
2025-Nov-22 17:45:51.891392
#13 0.480 src/app/api/auth:
2025-Nov-22 17:45:51.891392
#13 0.480 send-verification-code
2025-Nov-22 17:45:51.891392
#13 0.480 validate-session
2025-Nov-22 17:45:51.891392
#13 0.480 verify-code
2025-Nov-22 17:45:51.891392
#13 0.480
2025-Nov-22 17:45:51.891392
#13 0.480 src/app/api/auth/send-verification-code:
2025-Nov-22 17:45:51.891392
#13 0.480 route.ts
2025-Nov-22 17:45:51.891392
#13 0.480
2025-Nov-22 17:45:51.891392
#13 0.480 src/app/api/auth/validate-session:
2025-Nov-22 17:45:51.891392
#13 0.480 route.ts
2025-Nov-22 17:45:51.891392
#13 0.480
2025-Nov-22 17:45:51.891392
#13 0.480 src/app/api/auth/verify-code:
2025-Nov-22 17:45:51.891392
#13 0.480 route.ts
2025-Nov-22 17:45:51.891392
#13 0.480
2025-Nov-22 17:45:51.891392
#13 0.480 src/app/api/send-email:
2025-Nov-22 17:45:51.891392
#13 0.480 route.ts
2025-Nov-22 17:45:51.891392
#13 0.480
2025-Nov-22 17:45:51.891392
#13 0.480 src/app/recruiter-results:
2025-Nov-22 17:45:51.891392
#13 0.480 json.md
2025-Nov-22 17:45:51.891392
#13 0.480 layout.tsx
2025-Nov-22 17:45:51.891392
#13 0.480 page.tsx
2025-Nov-22 17:45:51.891392
#13 0.480
2025-Nov-22 17:45:51.891392
#13 0.480 src/app/services:
2025-Nov-22 17:45:51.891392
#13 0.480 ia
2025-Nov-22 17:45:51.891392
#13 0.480
2025-Nov-22 17:45:51.891392
#13 0.480 src/app/services/ia:
2025-Nov-22 17:45:51.891392
#13 0.480 page.tsx
2025-Nov-22 17:45:51.891392
#13 0.480
2025-Nov-22 17:45:51.891392
#13 0.480 src/components:
2025-Nov-22 17:45:51.891392
#13 0.480 auth
2025-Nov-22 17:45:51.891392
#13 0.480 layout
2025-Nov-22 17:45:51.891392
#13 0.480 sections
2025-Nov-22 17:45:51.891392
#13 0.480 ui
2025-Nov-22 17:45:51.891392
#13 0.480 whitelist-manager.tsx
2025-Nov-22 17:45:51.891392
#13 0.480
2025-Nov-22 17:45:51.891392
#13 0.480 src/components/auth:
2025-Nov-22 17:45:51.891392
#13 0.480 email-verification-popup.tsx
2025-Nov-22 17:45:51.891392
#13 0.480
2025-Nov-22 17:45:51.891392
#13 0.480 src/components/layout:
2025-Nov-22 17:45:51.891392
#13 0.480 footer.tsx
2025-Nov-22 17:45:51.891392
#13 0.480 header.tsx
2025-Nov-22 17:45:51.891392
#13 0.480
2025-Nov-22 17:45:51.891392
#13 0.480 src/components/sections:
2025-Nov-22 17:45:51.891392
#13 0.480 features.tsx
2025-Nov-22 17:45:51.891392
#13 0.480 hero.tsx
2025-Nov-22 17:45:51.891392
#13 0.480 upload-zone.tsx
2025-Nov-22 17:45:51.891392
#13 0.480
2025-Nov-22 17:45:51.891392
#13 0.480 src/components/ui:
2025-Nov-22 17:45:51.891392
#13 0.480 animation-background.tsx
2025-Nov-22 17:45:51.891392
#13 0.480 badge.tsx
2025-Nov-22 17:45:51.891392
#13 0.480 button.tsx
2025-Nov-22 17:45:51.891392
#13 0.480 card.tsx
2025-Nov-22 17:45:51.891392
#13 0.480 contact-popup.tsx
2025-Nov-22 17:45:51.891392
#13 0.480 dialog.tsx
2025-Nov-22 17:45:51.891392
#13 0.480 gdpr-popup.tsx
2025-Nov-22 17:45:51.891392
#13 0.480 hero-banner.tsx
2025-Nov-22 17:45:51.891392
#13 0.480 input.tsx
2025-Nov-22 17:45:51.891392
#13 0.480 label.tsx
2025-Nov-22 17:45:51.891392
#13 0.480 particle-background.tsx
2025-Nov-22 17:45:51.891392
#13 0.480 rate-limit-popup.tsx
2025-Nov-22 17:45:51.891392
#13 0.480 textarea.tsx
2025-Nov-22 17:45:51.891392
#13 0.480
2025-Nov-22 17:45:51.891392
#13 0.480 src/lib:
2025-Nov-22 17:45:51.891392
#13 0.480 ai-service.ts
2025-Nov-22 17:45:51.891392
#13 0.480 analytics.ts
2025-Nov-22 17:45:51.891392
#13 0.480 auth-service.ts
2025-Nov-22 17:45:51.891392
#13 0.480 cache-cleaner.ts
2025-Nov-22 17:45:51.891392
#13 0.480 constants.ts
2025-Nov-22 17:45:51.891392
#13 0.480 disposable-email-detector.ts
2025-Nov-22 17:45:51.891392
#13 0.480 rate-limit-service.ts
2025-Nov-22 17:45:51.891392
#13 0.480 supabase.ts
2025-Nov-22 17:45:51.891392
#13 0.480 utils.ts
2025-Nov-22 17:45:51.891392
#13 1.570    ▲ Next.js 15.3.4
2025-Nov-22 17:45:51.891392
#13 1.571
2025-Nov-22 17:45:51.891392
#13 1.611    Creating an optimized production build ...
2025-Nov-22 17:45:51.891392
#13 11.18 Failed to compile.
2025-Nov-22 17:45:51.891392
#13 11.18
2025-Nov-22 17:45:51.891392
#13 11.19 ./src/app/about/page.tsx
2025-Nov-22 17:45:51.891392
#13 11.19 Module not found: Can't resolve '@/components/ui/button'
2025-Nov-22 17:45:51.891392
#13 11.19
2025-Nov-22 17:45:51.891392
#13 11.19 https://nextjs.org/docs/messages/module-not-found
2025-Nov-22 17:45:51.891392
#13 11.19
2025-Nov-22 17:45:51.891392
#13 11.19 ./src/app/about/page.tsx
2025-Nov-22 17:45:51.891392
#13 11.19 Module not found: Can't resolve '@/components/ui/card'
2025-Nov-22 17:45:51.891392
#13 11.19
2025-Nov-22 17:45:51.891392
#13 11.19 https://nextjs.org/docs/messages/module-not-found
2025-Nov-22 17:45:51.891392
#13 11.19
2025-Nov-22 17:45:51.891392
#13 11.19 ./src/app/about/page.tsx
2025-Nov-22 17:45:51.891392
#13 11.19 Module not found: Can't resolve '@/components/ui/badge'
2025-Nov-22 17:45:51.891392
#13 11.19
2025-Nov-22 17:45:51.891392
#13 11.19 https://nextjs.org/docs/messages/module-not-found
2025-Nov-22 17:45:51.891392
#13 11.19
2025-Nov-22 17:45:51.891392
#13 11.19 ./src/app/about/page.tsx
2025-Nov-22 17:45:51.891392
#13 11.19 Module not found: Can't resolve '@/components/ui/contact-popup'
2025-Nov-22 17:45:51.891392
#13 11.19
2025-Nov-22 17:45:51.891392
#13 11.19 https://nextjs.org/docs/messages/module-not-found
2025-Nov-22 17:45:51.891392
#13 11.19
2025-Nov-22 17:45:51.891392
#13 11.19 ./src/app/about/page.tsx
2025-Nov-22 17:45:51.891392
#13 11.19 Module not found: Can't resolve '@/components/auth/email-verification-popup'
2025-Nov-22 17:45:51.891392
#13 11.19
2025-Nov-22 17:45:51.891392
#13 11.19 https://nextjs.org/docs/messages/module-not-found
2025-Nov-22 17:45:51.891392
#13 11.19
2025-Nov-22 17:45:51.891392
#13 11.21
2025-Nov-22 17:45:51.891392
#13 11.21 > Build failed because of webpack errors
2025-Nov-22 17:45:51.891392
#13 11.25 error Command failed with exit code 1.
2025-Nov-22 17:45:51.891392
#13 11.25 info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
2025-Nov-22 17:45:51.891392
#13 ERROR: process "/bin/bash -ol pipefail -c yarn run build" did not complete successfully: exit code: 1
2025-Nov-22 17:45:51.891392
------
2025-Nov-22 17:45:51.891392
> [stage-0  9/11] RUN --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-next/cache,target=/app/.next/cache --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-node_modules/cache,target=/app/node_modules/.cache yarn run build:
2025-Nov-22 17:45:51.891392
11.19
2025-Nov-22 17:45:51.891392
11.19 ./src/app/about/page.tsx
2025-Nov-22 17:45:51.891392
11.19 Module not found: Can't resolve '@/components/auth/email-verification-popup'
2025-Nov-22 17:45:51.891392
11.19
2025-Nov-22 17:45:51.891392
11.19 https://nextjs.org/docs/messages/module-not-found
2025-Nov-22 17:45:51.891392
11.19
2025-Nov-22 17:45:51.891392
11.21
2025-Nov-22 17:45:51.891392
11.21 > Build failed because of webpack errors
2025-Nov-22 17:45:51.891392
11.25 error Command failed with exit code 1.
2025-Nov-22 17:45:51.891392
11.25 info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
2025-Nov-22 17:45:51.891392
------
2025-Nov-22 17:45:51.891392
2025-Nov-22 17:45:51.891392
9 warnings found (use docker --debug to expand):
2025-Nov-22 17:45:51.891392
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ARG "SMTP_PASSWORD") (line 11)
2025-Nov-22 17:45:51.891392
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ARG "SUPABASE_SERVICE_ROLE_KEY") (line 11)
2025-Nov-22 17:45:51.891392
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ENV "NEXTAUTH_SECRET") (line 12)
2025-Nov-22 17:45:51.891392
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ENV "SUPABASE_SERVICE_ROLE_KEY") (line 12)
2025-Nov-22 17:45:51.891392
- UndefinedVar: Usage of undefined variable '$NIXPACKS_PATH' (line 18)
2025-Nov-22 17:45:51.891392
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ARG "NEXTAUTH_SECRET") (line 11)
2025-Nov-22 17:45:51.891392
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ARG "NEXT_PUBLIC_SUPABASE_ANON_KEY") (line 11)
2025-Nov-22 17:45:51.891392
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ENV "NEXT_PUBLIC_SUPABASE_ANON_KEY") (line 12)
2025-Nov-22 17:45:51.891392
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ENV "SMTP_PASSWORD") (line 12)
2025-Nov-22 17:45:51.891392
Dockerfile:24
2025-Nov-22 17:45:51.891392
--------------------
2025-Nov-22 17:45:51.891392
22 |     # build phase
2025-Nov-22 17:45:51.891392
23 |     COPY . /app/.
2025-Nov-22 17:45:51.891392
24 | >>> RUN --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-next/cache,target=/app/.next/cache --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-node_modules/cache,target=/app/node_modules/.cache yarn run build
2025-Nov-22 17:45:51.891392
25 |
2025-Nov-22 17:45:51.891392
26 |
2025-Nov-22 17:45:51.891392
--------------------
2025-Nov-22 17:45:51.891392
ERROR: failed to build: failed to solve: process "/bin/bash -ol pipefail -c yarn run build" did not complete successfully: exit code: 1
2025-Nov-22 17:45:51.891392
exit status 1
2025-Nov-22 17:45:51.905155
Deployment failed. Removing the new version of your application.
2025-Nov-22 17:45:53.090445
Gracefully shutting down build container: m8w0sksw4sokc0oksgc00080
2025-Nov-22 17:45:53.644309
[CMD]: docker stop --time=30 m8w0sksw4sokc0oksgc00080
2025-Nov-22 17:45:53.644309
m8w0sksw4sokc0oksgc00080
2025-Nov-22 17:45:53.929647
[CMD]: docker rm -f m8w0sksw4sokc0oksgc00080
2025-Nov-22 17:45:53.929647
Error response from daemon: No such container: m8w0sksw4sokc0oksgc00080