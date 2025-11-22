Starting deployment of francoform/IA_Recrutement_Pro:main to localhost.
2025-Nov-22 17:20:20.693727
Preparing container with helper image: ghcr.io/coollabsio/coolify-helper:1.0.12
2025-Nov-22 17:20:21.022057
[CMD]: docker stop --time=30 vws8kg88o8skc0wgcggscs8k
2025-Nov-22 17:20:21.022057
Error response from daemon: No such container: vws8kg88o8skc0wgcggscs8k
2025-Nov-22 17:20:21.338930
[CMD]: docker rm -f vws8kg88o8skc0wgcggscs8k
2025-Nov-22 17:20:21.338930
Error response from daemon: No such container: vws8kg88o8skc0wgcggscs8k
2025-Nov-22 17:20:21.696875
[CMD]: docker run -d --network coolify --name vws8kg88o8skc0wgcggscs8k  --rm -v /var/run/docker.sock:/var/run/docker.sock ghcr.io/coollabsio/coolify-helper:1.0.12
2025-Nov-22 17:20:21.696875
4ffe16344358b93547d17402e423edd4eeb9ede268489ff6efb75700e4c4147e
2025-Nov-22 17:20:23.914011
[CMD]: docker exec vws8kg88o8skc0wgcggscs8k bash -c 'GIT_SSH_COMMAND="ssh -o ConnectTimeout=30 -p 22 -o Port=22 -o LogLevel=ERROR -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" git ls-remote https://x-access-token:<REDACTED>@github.com/francoform/IA_Recrutement_Pro.git refs/heads/main'
2025-Nov-22 17:20:23.914011
9029ed5995fb92619039cc76f3721df62e4ace5c	refs/heads/main
2025-Nov-22 17:20:24.341336
Image not found (ygcggosc4k4wg04ck8k08w8s:9029ed5995fb92619039cc76f3721df62e4ace5c). Building new image.
2025-Nov-22 17:20:24.624224
----------------------------------------
2025-Nov-22 17:20:24.644887
Importing francoform/IA_Recrutement_Pro:main (commit sha 9029ed5995fb92619039cc76f3721df62e4ace5c) to /artifacts/vws8kg88o8skc0wgcggscs8k.
2025-Nov-22 17:20:25.039015
[CMD]: docker exec vws8kg88o8skc0wgcggscs8k bash -c 'git clone --depth=1 --recurse-submodules --shallow-submodules -b 'main' 'https://x-access-token:<REDACTED>@github.com/francoform/IA_Recrutement_Pro.git' '/artifacts/vws8kg88o8skc0wgcggscs8k' && cd '/artifacts/vws8kg88o8skc0wgcggscs8k' && if [ -f .gitmodules ]; then git submodule sync && GIT_SSH_COMMAND="ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" git submodule update --init --recursive --depth=1; fi && cd '/artifacts/vws8kg88o8skc0wgcggscs8k' && GIT_SSH_COMMAND="ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" git lfs pull'
2025-Nov-22 17:20:25.039015
Cloning into '/artifacts/vws8kg88o8skc0wgcggscs8k'...
2025-Nov-22 17:20:26.833200
[CMD]: docker exec vws8kg88o8skc0wgcggscs8k bash -c 'cd /artifacts/vws8kg88o8skc0wgcggscs8k && git log -1 9029ed5995fb92619039cc76f3721df62e4ace5c --pretty=%B'
2025-Nov-22 17:20:26.833200
fix: Add missing production dependencies for Coolify build
2025-Nov-22 17:20:26.833200
2025-Nov-22 17:20:26.833200
- Add react-is to satisfy recharts peer dependency
2025-Nov-22 17:20:26.833200
- Move @tailwindcss/postcss to dependencies (needed for production build)
2025-Nov-22 17:20:27.221673
Generating nixpacks configuration with: nixpacks plan -f json --env SOURCE_COMMIT=9029ed5995fb92619039cc76f3721df62e4ace5c --env COOLIFY_URL=https://ia-recrutement-pro.be2web.fr --env COOLIFY_FQDN=ia-recrutement-pro.be2web.fr --env COOLIFY_BRANCH=main --env COOLIFY_RESOURCE_UUID=ygcggosc4k4wg04ck8k08w8s --env COOLIFY_CONTAINER_NAME=ygcggosc4k4wg04ck8k08w8s-172019072846 /artifacts/vws8kg88o8skc0wgcggscs8k
2025-Nov-22 17:20:27.592997
[CMD]: docker exec vws8kg88o8skc0wgcggscs8k bash -c 'nixpacks plan -f json --env SOURCE_COMMIT=9029ed5995fb92619039cc76f3721df62e4ace5c --env COOLIFY_URL=https://ia-recrutement-pro.be2web.fr --env COOLIFY_FQDN=ia-recrutement-pro.be2web.fr --env COOLIFY_BRANCH=main --env COOLIFY_RESOURCE_UUID=ygcggosc4k4wg04ck8k08w8s --env COOLIFY_CONTAINER_NAME=ygcggosc4k4wg04ck8k08w8s-172019072846 /artifacts/vws8kg88o8skc0wgcggscs8k'
2025-Nov-22 17:20:27.592997
{
2025-Nov-22 17:20:27.592997
"providers": [],
2025-Nov-22 17:20:27.592997
"buildImage": "ghcr.io/railwayapp/nixpacks:ubuntu-1745885067",
2025-Nov-22 17:20:27.592997
"variables": {
2025-Nov-22 17:20:27.592997
"CI": "true",
2025-Nov-22 17:20:27.592997
"COOLIFY_BRANCH": "main",
2025-Nov-22 17:20:27.592997
"COOLIFY_CONTAINER_NAME": "ygcggosc4k4wg04ck8k08w8s-172019072846",
2025-Nov-22 17:20:27.592997
"COOLIFY_FQDN": "ia-recrutement-pro.be2web.fr",
2025-Nov-22 17:20:27.592997
"COOLIFY_RESOURCE_UUID": "ygcggosc4k4wg04ck8k08w8s",
2025-Nov-22 17:20:27.592997
"COOLIFY_URL": "https://ia-recrutement-pro.be2web.fr",
2025-Nov-22 17:20:27.592997
"NIXPACKS_METADATA": "node",
2025-Nov-22 17:20:27.592997
"NODE_ENV": "production",
2025-Nov-22 17:20:27.592997
"NPM_CONFIG_PRODUCTION": "false",
2025-Nov-22 17:20:27.592997
"SOURCE_COMMIT": "9029ed5995fb92619039cc76f3721df62e4ace5c"
2025-Nov-22 17:20:27.592997
},
2025-Nov-22 17:20:27.592997
"phases": {
2025-Nov-22 17:20:27.592997
"build": {
2025-Nov-22 17:20:27.592997
"dependsOn": [
2025-Nov-22 17:20:27.592997
"install"
2025-Nov-22 17:20:27.592997
],
2025-Nov-22 17:20:27.592997
"cmds": [
2025-Nov-22 17:20:27.592997
"yarn run build"
2025-Nov-22 17:20:27.592997
],
2025-Nov-22 17:20:27.592997
"cacheDirectories": [
2025-Nov-22 17:20:27.592997
".next/cache",
2025-Nov-22 17:20:27.592997
"node_modules/.cache"
2025-Nov-22 17:20:27.592997
]
2025-Nov-22 17:20:27.592997
},
2025-Nov-22 17:20:27.592997
"install": {
2025-Nov-22 17:20:27.592997
"dependsOn": [
2025-Nov-22 17:20:27.592997
"setup"
2025-Nov-22 17:20:27.592997
],
2025-Nov-22 17:20:27.592997
"cmds": [
2025-Nov-22 17:20:27.592997
"yarn install --frozen-lockfile"
2025-Nov-22 17:20:27.592997
],
2025-Nov-22 17:20:27.592997
"cacheDirectories": [
2025-Nov-22 17:20:27.592997
"/usr/local/share/.cache/yarn/v6"
2025-Nov-22 17:20:27.592997
],
2025-Nov-22 17:20:27.592997
"paths": [
2025-Nov-22 17:20:27.592997
"/app/node_modules/.bin"
2025-Nov-22 17:20:27.592997
]
2025-Nov-22 17:20:27.592997
},
2025-Nov-22 17:20:27.592997
"setup": {
2025-Nov-22 17:20:27.592997
"nixPkgs": [
2025-Nov-22 17:20:27.592997
"nodejs_24",
2025-Nov-22 17:20:27.592997
"yarn-1_x"
2025-Nov-22 17:20:27.592997
],
2025-Nov-22 17:20:27.592997
"nixLibs": [
2025-Nov-22 17:20:27.592997
"gcc-unwrapped"
2025-Nov-22 17:20:27.592997
],
2025-Nov-22 17:20:27.592997
"nixOverlays": [
2025-Nov-22 17:20:27.592997
"https://github.com/railwayapp/nix-npm-overlay/archive/main.tar.gz"
2025-Nov-22 17:20:27.592997
],
2025-Nov-22 17:20:27.592997
"nixpkgsArchive": "23f9169c4ccce521379e602cc82ed873a1f1b52b"
2025-Nov-22 17:20:27.592997
}
2025-Nov-22 17:20:27.592997
},
2025-Nov-22 17:20:27.592997
"start": {
2025-Nov-22 17:20:27.592997
"cmd": "yarn run start"
2025-Nov-22 17:20:27.592997
}
2025-Nov-22 17:20:27.592997
}
2025-Nov-22 17:20:28.040106
[CMD]: docker exec vws8kg88o8skc0wgcggscs8k bash -c 'nixpacks detect /artifacts/vws8kg88o8skc0wgcggscs8k'
2025-Nov-22 17:20:28.040106
node
2025-Nov-22 17:20:28.056433
Found application type: node.
2025-Nov-22 17:20:28.070157
If you need further customization, please check the documentation of Nixpacks: https://nixpacks.com/docs/providers/node
2025-Nov-22 17:20:28.122970
----------------------------------------
2025-Nov-22 17:20:28.142404
⚠️ NIXPACKS_NODE_VERSION not set. Nixpacks will use Node.js 18 by default, which is EOL.
2025-Nov-22 17:20:28.151669
You can override this by setting NIXPACKS_NODE_VERSION=22 in your environment variables.
2025-Nov-22 17:20:28.159857
Final Nixpacks plan: {
2025-Nov-22 17:20:28.159857
"providers": [],
2025-Nov-22 17:20:28.159857
"buildImage": "ghcr.io\/railwayapp\/nixpacks:ubuntu-1745885067",
2025-Nov-22 17:20:28.159857
"variables": {
2025-Nov-22 17:20:28.159857
"CI": "true",
2025-Nov-22 17:20:28.159857
"COOLIFY_BRANCH": "main",
2025-Nov-22 17:20:28.159857
"COOLIFY_CONTAINER_NAME": "ygcggosc4k4wg04ck8k08w8s-172019072846",
2025-Nov-22 17:20:28.159857
"COOLIFY_FQDN": "ia-recrutement-pro.be2web.fr",
2025-Nov-22 17:20:28.159857
"COOLIFY_RESOURCE_UUID": "ygcggosc4k4wg04ck8k08w8s",
2025-Nov-22 17:20:28.159857
"COOLIFY_URL": "https:\/\/ia-recrutement-pro.be2web.fr",
2025-Nov-22 17:20:28.159857
"NIXPACKS_METADATA": "node",
2025-Nov-22 17:20:28.159857
"NODE_ENV": "production",
2025-Nov-22 17:20:28.159857
"NPM_CONFIG_PRODUCTION": "false",
2025-Nov-22 17:20:28.159857
"SOURCE_COMMIT": "9029ed5995fb92619039cc76f3721df62e4ace5c",
2025-Nov-22 17:20:28.159857
"NEXT_PUBLIC_BASE_URL": "https:\/\/ia-recrutement-pro.be2web.fr\/",
2025-Nov-22 17:20:28.159857
"NEXT_PUBLIC_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxZHR0bmFnZHpuZGxwdmRhcnlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3ODYzNjUsImV4cCI6MjA3MTM2MjM2NX0.HEmw-EWietIVX5uKpSCpEGZ4YPS4odLkg2O9gJN13TY",
2025-Nov-22 17:20:28.159857
"NEXT_PUBLIC_SUPABASE_URL": "https:\/\/lqdttnagdzndlpvdaryj.supabase.co",
2025-Nov-22 17:20:28.159857
"NEXTAUTH_SECRET": "8k9mN2pQ7rS4tU6vW8xY0zA1bC3dE5fG7hI9jK2lM4nO6pQ8rS0tU2vW4xY6zA8bC0dE2fG4hI6jK8lM0nO2pQ4rS6tU8vW0xY2zA4bC6dE8fG0hI2jK4lM6nO8pQ0rS2tU4vW6xY8zA0bC2dE4fG6hI8jK0lM2nO4pQ6rS8tU0vW2xY4zA6bC8dE0fG2hI4jK6lM8nO0pQ2rS4tU6vW8xY0zA2bC4dE6fG8hI0jK2lM4nO6pQ8rS0tU2vW4xY6zA8bC0dE2fG4hI6jK8lM0nO2pQ4rS6tU8vW0xY2zA4",
2025-Nov-22 17:20:28.159857
"NEXTAUTH_URL": "https:\/\/ia-recrutement-pro.be2web.fr",
2025-Nov-22 17:20:28.159857
"SMTP_PASSWORD": "Maxime%9524",
2025-Nov-22 17:20:28.159857
"SMTP_SECURE": "true",
2025-Nov-22 17:20:28.159857
"SUPABASE_SERVICE_ROLE_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxZHR0bmFnZHpuZGxwdmRhcnlqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTc4NjM2NSwiZXhwIjoyMDcxMzYyMzY1fQ.lEOLH0N71wO6OX9QS7WfUh4q5aGVdkYBk3weiYv5ue8"
2025-Nov-22 17:20:28.159857
},
2025-Nov-22 17:20:28.159857
"phases": {
2025-Nov-22 17:20:28.159857
"build": {
2025-Nov-22 17:20:28.159857
"dependsOn": [
2025-Nov-22 17:20:28.159857
"install"
2025-Nov-22 17:20:28.159857
],
2025-Nov-22 17:20:28.159857
"cmds": [
2025-Nov-22 17:20:28.159857
"yarn run build"
2025-Nov-22 17:20:28.159857
],
2025-Nov-22 17:20:28.159857
"cacheDirectories": [
2025-Nov-22 17:20:28.159857
".next\/cache",
2025-Nov-22 17:20:28.159857
"node_modules\/.cache"
2025-Nov-22 17:20:28.159857
]
2025-Nov-22 17:20:28.159857
},
2025-Nov-22 17:20:28.159857
"install": {
2025-Nov-22 17:20:28.159857
"dependsOn": [
2025-Nov-22 17:20:28.159857
"setup"
2025-Nov-22 17:20:28.159857
],
2025-Nov-22 17:20:28.159857
"cmds": [
2025-Nov-22 17:20:28.159857
"yarn install --frozen-lockfile"
2025-Nov-22 17:20:28.159857
],
2025-Nov-22 17:20:28.159857
"cacheDirectories": [
2025-Nov-22 17:20:28.159857
"\/usr\/local\/share\/.cache\/yarn\/v6"
2025-Nov-22 17:20:28.159857
],
2025-Nov-22 17:20:28.159857
"paths": [
2025-Nov-22 17:20:28.159857
"\/app\/node_modules\/.bin"
2025-Nov-22 17:20:28.159857
]
2025-Nov-22 17:20:28.159857
},
2025-Nov-22 17:20:28.159857
"setup": {
2025-Nov-22 17:20:28.159857
"nixPkgs": [
2025-Nov-22 17:20:28.159857
"nodejs_24",
2025-Nov-22 17:20:28.159857
"yarn-1_x"
2025-Nov-22 17:20:28.159857
],
2025-Nov-22 17:20:28.159857
"nixLibs": [
2025-Nov-22 17:20:28.159857
"gcc-unwrapped"
2025-Nov-22 17:20:28.159857
],
2025-Nov-22 17:20:28.159857
"nixOverlays": [
2025-Nov-22 17:20:28.159857
"https:\/\/github.com\/railwayapp\/nix-npm-overlay\/archive\/main.tar.gz"
2025-Nov-22 17:20:28.159857
],
2025-Nov-22 17:20:28.159857
"nixpkgsArchive": "23f9169c4ccce521379e602cc82ed873a1f1b52b",
2025-Nov-22 17:20:28.159857
"aptPkgs": [
2025-Nov-22 17:20:28.159857
"curl",
2025-Nov-22 17:20:28.159857
"wget"
2025-Nov-22 17:20:28.159857
]
2025-Nov-22 17:20:28.159857
}
2025-Nov-22 17:20:28.159857
},
2025-Nov-22 17:20:28.159857
"start": {
2025-Nov-22 17:20:28.159857
"cmd": "yarn run start"
2025-Nov-22 17:20:28.159857
}
2025-Nov-22 17:20:28.159857
}
2025-Nov-22 17:20:29.593393
Creating build-time .env file in /artifacts (outside Docker context).
2025-Nov-22 17:20:30.403342
[CMD]: docker exec vws8kg88o8skc0wgcggscs8k bash -c 'cat /artifacts/build-time.env'
2025-Nov-22 17:20:30.403342
SOURCE_COMMIT='9029ed5995fb92619039cc76f3721df62e4ace5c'
2025-Nov-22 17:20:30.403342
COOLIFY_URL='https://ia-recrutement-pro.be2web.fr'
2025-Nov-22 17:20:30.403342
COOLIFY_FQDN='ia-recrutement-pro.be2web.fr'
2025-Nov-22 17:20:30.403342
COOLIFY_BRANCH='main'
2025-Nov-22 17:20:30.403342
COOLIFY_RESOURCE_UUID='ygcggosc4k4wg04ck8k08w8s'
2025-Nov-22 17:20:30.403342
COOLIFY_CONTAINER_NAME='ygcggosc4k4wg04ck8k08w8s-172019072846'
2025-Nov-22 17:20:30.403342
NEXT_PUBLIC_BASE_URL="https://ia-recrutement-pro.be2web.fr/"
2025-Nov-22 17:20:30.403342
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxZHR0bmFnZHpuZGxwdmRhcnlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3ODYzNjUsImV4cCI6MjA3MTM2MjM2NX0.HEmw-EWietIVX5uKpSCpEGZ4YPS4odLkg2O9gJN13TY"
2025-Nov-22 17:20:30.403342
NEXT_PUBLIC_SUPABASE_URL="https://lqdttnagdzndlpvdaryj.supabase.co"
2025-Nov-22 17:20:30.403342
NEXTAUTH_SECRET="8k9mN2pQ7rS4tU6vW8xY0zA1bC3dE5fG7hI9jK2lM4nO6pQ8rS0tU2vW4xY6zA8bC0dE2fG4hI6jK8lM0nO2pQ4rS6tU8vW0xY2zA4bC6dE8fG0hI2jK4lM6nO8pQ0rS2tU4vW6xY8zA0bC2dE4fG6hI8jK0lM2nO4pQ6rS8tU0vW2xY4zA6bC8dE0fG2hI4jK6lM8nO0pQ2rS4tU6vW8xY0zA2bC4dE6fG8hI0jK2lM4nO6pQ8rS0tU2vW4xY6zA8bC0dE2fG4hI6jK8lM0nO2pQ4rS6tU8vW0xY2zA4"
2025-Nov-22 17:20:30.403342
NEXTAUTH_URL="https://ia-recrutement-pro.be2web.fr"
2025-Nov-22 17:20:30.403342
NODE_ENV="production"
2025-Nov-22 17:20:30.403342
SMTP_PASSWORD="Maxime%9524"
2025-Nov-22 17:20:30.403342
SMTP_SECURE="true"
2025-Nov-22 17:20:30.403342
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxZHR0bmFnZHpuZGxwdmRhcnlqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTc4NjM2NSwiZXhwIjoyMDcxMzYyMzY1fQ.lEOLH0N71wO6OX9QS7WfUh4q5aGVdkYBk3weiYv5ue8"
2025-Nov-22 17:20:30.415028
----------------------------------------
2025-Nov-22 17:20:30.426104
⚠️ Build-time environment variable warning: NODE_ENV=production
2025-Nov-22 17:20:30.438943
Affects: Node.js/npm/yarn/bun/pnpm
2025-Nov-22 17:20:30.452247
Issue: Skips devDependencies installation which are often required for building (webpack, typescript, etc.)
2025-Nov-22 17:20:30.465525
Recommendation: Uncheck "Available at Buildtime" or use "development" during build
2025-Nov-22 17:20:30.476545
2025-Nov-22 17:20:30.488331
💡 Tips to resolve build issues:
2025-Nov-22 17:20:30.499890
1. Set these variables as "Runtime only" in the environment variables settings
2025-Nov-22 17:20:30.507495
2. Use different values for build-time (e.g., NODE_ENV=development for build)
2025-Nov-22 17:20:30.516417
3. Consider using multi-stage Docker builds to separate build and runtime environments
2025-Nov-22 17:20:30.534887
----------------------------------------
2025-Nov-22 17:20:30.548967
Building docker image started.
2025-Nov-22 17:20:30.574442
To check the current progress, click on Show Debug Logs.
2025-Nov-22 17:20:31.417869
[CMD]: docker exec vws8kg88o8skc0wgcggscs8k bash -c 'nixpacks build -c /artifacts/thegameplan.json --cache-key 'ygcggosc4k4wg04ck8k08w8s' --no-error-without-start -n ygcggosc4k4wg04ck8k08w8s:9029ed5995fb92619039cc76f3721df62e4ace5c /artifacts/vws8kg88o8skc0wgcggscs8k -o /artifacts/vws8kg88o8skc0wgcggscs8k'
2025-Nov-22 17:20:31.417869
2025-Nov-22 17:20:31.417869
╔══════════════ Nixpacks v1.41.0 ══════════════╗
2025-Nov-22 17:20:31.417869
║ setup      │ nodejs_24, yarn-1_x, curl, wget ║
2025-Nov-22 17:20:31.417869
║──────────────────────────────────────────────║
2025-Nov-22 17:20:31.417869
║ install    │ yarn install --frozen-lockfile  ║
2025-Nov-22 17:20:31.417869
║──────────────────────────────────────────────║
2025-Nov-22 17:20:31.417869
║ build      │ yarn run build                  ║
2025-Nov-22 17:20:31.417869
║──────────────────────────────────────────────║
2025-Nov-22 17:20:31.417869
║ start      │ yarn run start                  ║
2025-Nov-22 17:20:31.417869
╚══════════════════════════════════════════════╝
2025-Nov-22 17:20:31.417869
2025-Nov-22 17:20:31.417869
2025-Nov-22 17:20:31.417869
Saved output to:
2025-Nov-22 17:20:31.417869
/artifacts/vws8kg88o8skc0wgcggscs8k
2025-Nov-22 17:20:31.819905
[CMD]: docker exec vws8kg88o8skc0wgcggscs8k bash -c 'cat /artifacts/vws8kg88o8skc0wgcggscs8k/.nixpacks/Dockerfile'
2025-Nov-22 17:20:31.819905
FROM ghcr.io/railwayapp/nixpacks:ubuntu-1745885067
2025-Nov-22 17:20:31.819905
2025-Nov-22 17:20:31.819905
ENTRYPOINT ["/bin/bash", "-l", "-c"]
2025-Nov-22 17:20:31.819905
WORKDIR /app/
2025-Nov-22 17:20:31.819905
2025-Nov-22 17:20:31.819905
2025-Nov-22 17:20:31.819905
COPY .nixpacks/nixpkgs-23f9169c4ccce521379e602cc82ed873a1f1b52b.nix .nixpacks/nixpkgs-23f9169c4ccce521379e602cc82ed873a1f1b52b.nix
2025-Nov-22 17:20:31.819905
RUN nix-env -if .nixpacks/nixpkgs-23f9169c4ccce521379e602cc82ed873a1f1b52b.nix && nix-collect-garbage -d
2025-Nov-22 17:20:31.819905
RUN sudo apt-get update && sudo apt-get install -y --no-install-recommends curl wget
2025-Nov-22 17:20:31.819905
2025-Nov-22 17:20:31.819905
ARG CI COOLIFY_BRANCH COOLIFY_CONTAINER_NAME COOLIFY_FQDN COOLIFY_RESOURCE_UUID COOLIFY_URL NEXTAUTH_SECRET NEXTAUTH_URL NEXT_PUBLIC_BASE_URL NEXT_PUBLIC_SUPABASE_ANON_KEY NEXT_PUBLIC_SUPABASE_URL NIXPACKS_METADATA NODE_ENV NPM_CONFIG_PRODUCTION SMTP_PASSWORD SMTP_SECURE SOURCE_COMMIT SUPABASE_SERVICE_ROLE_KEY
2025-Nov-22 17:20:31.819905
ENV CI=$CI COOLIFY_BRANCH=$COOLIFY_BRANCH COOLIFY_CONTAINER_NAME=$COOLIFY_CONTAINER_NAME COOLIFY_FQDN=$COOLIFY_FQDN COOLIFY_RESOURCE_UUID=$COOLIFY_RESOURCE_UUID COOLIFY_URL=$COOLIFY_URL NEXTAUTH_SECRET=$NEXTAUTH_SECRET NEXTAUTH_URL=$NEXTAUTH_URL NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL NIXPACKS_METADATA=$NIXPACKS_METADATA NODE_ENV=$NODE_ENV NPM_CONFIG_PRODUCTION=$NPM_CONFIG_PRODUCTION SMTP_PASSWORD=$SMTP_PASSWORD SMTP_SECURE=$SMTP_SECURE SOURCE_COMMIT=$SOURCE_COMMIT SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_ROLE_KEY
2025-Nov-22 17:20:31.819905
2025-Nov-22 17:20:31.819905
# setup phase
2025-Nov-22 17:20:31.819905
# noop
2025-Nov-22 17:20:31.819905
2025-Nov-22 17:20:31.819905
# install phase
2025-Nov-22 17:20:31.819905
ENV NIXPACKS_PATH=/app/node_modules/.bin:$NIXPACKS_PATH
2025-Nov-22 17:20:31.819905
COPY . /app/.
2025-Nov-22 17:20:31.819905
RUN --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-/usr/local/share/cache/yarn/v6,target=/usr/local/share/.cache/yarn/v6 yarn install --frozen-lockfile
2025-Nov-22 17:20:31.819905
2025-Nov-22 17:20:31.819905
# build phase
2025-Nov-22 17:20:31.819905
COPY . /app/.
2025-Nov-22 17:20:31.819905
RUN --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-next/cache,target=/app/.next/cache --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-node_modules/cache,target=/app/node_modules/.cache yarn run build
2025-Nov-22 17:20:31.819905
2025-Nov-22 17:20:31.819905
2025-Nov-22 17:20:31.819905
RUN printf '\nPATH=/app/node_modules/.bin:$PATH' >> /root/.profile
2025-Nov-22 17:20:31.819905
2025-Nov-22 17:20:31.819905
2025-Nov-22 17:20:31.819905
# start
2025-Nov-22 17:20:31.819905
COPY . /app
2025-Nov-22 17:20:31.819905
2025-Nov-22 17:20:31.819905
CMD ["yarn run start"]
2025-Nov-22 17:20:32.555592
[CMD]: docker exec vws8kg88o8skc0wgcggscs8k bash -c 'cat /artifacts/build.sh'
2025-Nov-22 17:20:32.555592
cd /artifacts/vws8kg88o8skc0wgcggscs8k && set -a && source /artifacts/build-time.env && set +a && docker build --add-host ckso4o8w888wkg8ggk0wc8sw:10.0.1.7 --add-host coolify:10.0.1.3 --add-host coolify-db:10.0.1.4 --add-host coolify-realtime:10.0.1.8 --add-host coolify-redis:10.0.1.10 --network host -f /artifacts/vws8kg88o8skc0wgcggscs8k/.nixpacks/Dockerfile --progress plain -t ygcggosc4k4wg04ck8k08w8s:9029ed5995fb92619039cc76f3721df62e4ace5c --build-arg CI --build-arg COOLIFY_BRANCH --build-arg COOLIFY_CONTAINER_NAME --build-arg COOLIFY_FQDN --build-arg COOLIFY_RESOURCE_UUID --build-arg COOLIFY_URL --build-arg NIXPACKS_METADATA --build-arg NODE_ENV --build-arg NPM_CONFIG_PRODUCTION --build-arg SOURCE_COMMIT --build-arg NEXT_PUBLIC_BASE_URL --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY --build-arg NEXT_PUBLIC_SUPABASE_URL --build-arg NEXTAUTH_SECRET --build-arg NEXTAUTH_URL --build-arg SMTP_PASSWORD --build-arg SMTP_SECURE --build-arg SUPABASE_SERVICE_ROLE_KEY --build-arg COOLIFY_BUILD_SECRETS_HASH=9c42ac0d3326f3c971dae352d2e5b3520ddf03765180b266894fb351acad37a1 --build-arg 'SOURCE_COMMIT' --build-arg 'COOLIFY_URL' --build-arg 'COOLIFY_FQDN' --build-arg 'COOLIFY_BRANCH' --build-arg 'COOLIFY_RESOURCE_UUID' --build-arg 'COOLIFY_CONTAINER_NAME' /artifacts/vws8kg88o8skc0wgcggscs8k
2025-Nov-22 17:20:33.335449
[CMD]: docker exec vws8kg88o8skc0wgcggscs8k bash -c 'bash /artifacts/build.sh'
2025-Nov-22 17:20:33.335449
#0 building with "default" instance using docker driver
2025-Nov-22 17:20:33.335449
2025-Nov-22 17:20:33.335449
#1 [internal] load build definition from Dockerfile
2025-Nov-22 17:20:33.335449
#1 transferring dockerfile: 2.02kB done
2025-Nov-22 17:20:33.335449
#1 DONE 0.0s
2025-Nov-22 17:20:33.335449
2025-Nov-22 17:20:33.335449
#2 [internal] load metadata for ghcr.io/railwayapp/nixpacks:ubuntu-1745885067
2025-Nov-22 17:20:33.621297
#2 DONE 0.4s
2025-Nov-22 17:20:33.748917
#3 [internal] load .dockerignore
2025-Nov-22 17:20:33.748917
#3 transferring context: 2B done
2025-Nov-22 17:20:33.748917
#3 DONE 0.0s
2025-Nov-22 17:20:33.748917
2025-Nov-22 17:20:33.748917
#4 [stage-0  1/11] FROM ghcr.io/railwayapp/nixpacks:ubuntu-1745885067@sha256:d45c89d80e13d7ad0fd555b5130f22a866d9dd10e861f589932303ef2314c7de
2025-Nov-22 17:20:33.748917
#4 DONE 0.0s
2025-Nov-22 17:20:33.748917
2025-Nov-22 17:20:33.748917
#5 [internal] load build context
2025-Nov-22 17:20:33.748917
#5 transferring context: 3.33MB 0.1s done
2025-Nov-22 17:20:33.917860
#5 DONE 0.1s
2025-Nov-22 17:20:33.917860
2025-Nov-22 17:20:33.917860
#6 [stage-0  2/11] WORKDIR /app/
2025-Nov-22 17:20:33.917860
#6 CACHED
2025-Nov-22 17:20:33.917860
2025-Nov-22 17:20:33.917860
#7 [stage-0  3/11] COPY .nixpacks/nixpkgs-23f9169c4ccce521379e602cc82ed873a1f1b52b.nix .nixpacks/nixpkgs-23f9169c4ccce521379e602cc82ed873a1f1b52b.nix
2025-Nov-22 17:20:33.917860
#7 CACHED
2025-Nov-22 17:20:33.917860
2025-Nov-22 17:20:33.917860
#8 [stage-0  4/11] RUN nix-env -if .nixpacks/nixpkgs-23f9169c4ccce521379e602cc82ed873a1f1b52b.nix && nix-collect-garbage -d
2025-Nov-22 17:20:33.917860
#8 CACHED
2025-Nov-22 17:20:33.917860
2025-Nov-22 17:20:33.917860
#9 [stage-0  5/11] RUN sudo apt-get update && sudo apt-get install -y --no-install-recommends curl wget
2025-Nov-22 17:20:33.917860
#9 CACHED
2025-Nov-22 17:20:33.917860
2025-Nov-22 17:20:33.917860
#10 [stage-0  6/11] COPY . /app/.
2025-Nov-22 17:20:33.917860
#10 DONE 0.1s
2025-Nov-22 17:20:34.069848
#11 [stage-0  7/11] RUN --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-/usr/local/share/cache/yarn/v6,target=/usr/local/share/.cache/yarn/v6 yarn install --frozen-lockfile
2025-Nov-22 17:20:34.429475
#11 0.510 yarn install v1.22.22
2025-Nov-22 17:20:34.669393
#11 0.594 [1/5] Validating package.json...
2025-Nov-22 17:20:34.669393
#11 0.600 [2/5] Resolving packages...
2025-Nov-22 17:20:34.754035
#11 0.835 (node:1) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.
2025-Nov-22 17:20:34.754035
#11 0.835 (Use `node --trace-deprecation ...` to show where the warning was created)
2025-Nov-22 17:20:34.908747
#11 0.839 [3/5] Fetching packages...
2025-Nov-22 17:20:35.290234
#11 1.371 [4/5] Linking dependencies...
2025-Nov-22 17:20:35.476256
#11 1.399 warning Workspaces can only be enabled in private projects.
2025-Nov-22 17:20:35.476256
#11 1.406 warning Workspaces can only be enabled in private projects.
2025-Nov-22 17:20:40.400855
#11 6.481 [5/5] Building fresh packages...
2025-Nov-22 17:20:40.566867
#11 6.648 Done in 6.14s.
2025-Nov-22 17:20:40.705420
#11 DONE 6.8s
2025-Nov-22 17:20:40.921421
#12 [stage-0  8/11] COPY . /app/.
2025-Nov-22 17:20:40.921421
#12 DONE 0.1s
2025-Nov-22 17:20:40.921421
2025-Nov-22 17:20:40.921421
#13 [stage-0  9/11] RUN --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-next/cache,target=/app/.next/cache --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-node_modules/cache,target=/app/node_modules/.cache yarn run build
2025-Nov-22 17:20:41.309059
#13 0.543 yarn run v1.22.22
2025-Nov-22 17:20:41.525493
#13 0.610 $ next build
2025-Nov-22 17:20:42.394519
#13 1.630  ⚠ Invalid next.config.js options detected:
2025-Nov-22 17:20:42.527583
#13 1.630  ⚠     Unrecognized key(s) in object: 'serverComponentsExternalPackages' at "experimental"
2025-Nov-22 17:20:42.527583
#13 1.630  ⚠ See more info here: https://nextjs.org/docs/messages/invalid-next-config
2025-Nov-22 17:20:42.527583
#13 1.632  ⚠ `experimental.serverComponentsExternalPackages` has been moved to `serverExternalPackages`. Please update your next.config.js file accordingly.
2025-Nov-22 17:20:42.527583
#13 1.726    ▲ Next.js 15.3.4
2025-Nov-22 17:20:42.527583
#13 1.726
2025-Nov-22 17:20:42.527583
#13 1.763    Creating an optimized production build ...
2025-Nov-22 17:20:52.867329
#13 12.10 Failed to compile.
2025-Nov-22 17:20:52.867329
#13 12.10
2025-Nov-22 17:20:53.090768
#13 12.10 ./src/app/about/page.tsx
2025-Nov-22 17:20:53.090768
#13 12.10 Module not found: Can't resolve '@/components/ui/button'
2025-Nov-22 17:20:53.090768
#13 12.10
2025-Nov-22 17:20:53.090768
#13 12.10 https://nextjs.org/docs/messages/module-not-found
2025-Nov-22 17:20:53.090768
#13 12.10
2025-Nov-22 17:20:53.090768
#13 12.10 ./src/app/about/page.tsx
2025-Nov-22 17:20:53.090768
#13 12.10 Module not found: Can't resolve '@/components/ui/card'
2025-Nov-22 17:20:53.090768
#13 12.10
2025-Nov-22 17:20:53.090768
#13 12.10 https://nextjs.org/docs/messages/module-not-found
2025-Nov-22 17:20:53.090768
#13 12.10
2025-Nov-22 17:20:53.090768
#13 12.10 ./src/app/about/page.tsx
2025-Nov-22 17:20:53.090768
#13 12.10 Module not found: Can't resolve '@/components/ui/badge'
2025-Nov-22 17:20:53.090768
#13 12.10
2025-Nov-22 17:20:53.090768
#13 12.10 https://nextjs.org/docs/messages/module-not-found
2025-Nov-22 17:20:53.090768
#13 12.10
2025-Nov-22 17:20:53.090768
#13 12.10 ./src/app/about/page.tsx
2025-Nov-22 17:20:53.090768
#13 12.10 Module not found: Can't resolve '@/components/ui/contact-popup'
2025-Nov-22 17:20:53.090768
#13 12.10
2025-Nov-22 17:20:53.090768
#13 12.10 https://nextjs.org/docs/messages/module-not-found
2025-Nov-22 17:20:53.090768
#13 12.10
2025-Nov-22 17:20:53.090768
#13 12.10 ./src/app/about/page.tsx
2025-Nov-22 17:20:53.090768
#13 12.10 Module not found: Can't resolve '@/components/auth/email-verification-popup'
2025-Nov-22 17:20:53.090768
#13 12.10
2025-Nov-22 17:20:53.090768
#13 12.10 https://nextjs.org/docs/messages/module-not-found
2025-Nov-22 17:20:53.090768
#13 12.10
2025-Nov-22 17:20:53.090768
#13 12.13
2025-Nov-22 17:20:53.090768
#13 12.13 > Build failed because of webpack errors
2025-Nov-22 17:20:53.090768
#13 12.18 error Command failed with exit code 1.
2025-Nov-22 17:20:53.090768
#13 12.18 info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
2025-Nov-22 17:20:53.090768
#13 ERROR: process "/bin/bash -ol pipefail -c yarn run build" did not complete successfully: exit code: 1
2025-Nov-22 17:20:53.157668
------
2025-Nov-22 17:20:53.157668
> [stage-0  9/11] RUN --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-next/cache,target=/app/.next/cache --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-node_modules/cache,target=/app/node_modules/.cache yarn run build:
2025-Nov-22 17:20:53.157668
12.10
2025-Nov-22 17:20:53.157668
12.10 ./src/app/about/page.tsx
2025-Nov-22 17:20:53.157668
12.10 Module not found: Can't resolve '@/components/auth/email-verification-popup'
2025-Nov-22 17:20:53.157668
12.10
2025-Nov-22 17:20:53.157668
12.10 https://nextjs.org/docs/messages/module-not-found
2025-Nov-22 17:20:53.157668
12.10
2025-Nov-22 17:20:53.157668
12.13
2025-Nov-22 17:20:53.157668
12.13 > Build failed because of webpack errors
2025-Nov-22 17:20:53.157668
12.18 error Command failed with exit code 1.
2025-Nov-22 17:20:53.157668
12.18 info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
2025-Nov-22 17:20:53.157668
------
2025-Nov-22 17:20:53.173521
9 warnings found (use docker --debug to expand):
2025-Nov-22 17:20:53.173521
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ENV "SUPABASE_SERVICE_ROLE_KEY") (line 12)
2025-Nov-22 17:20:53.173521
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ARG "NEXTAUTH_SECRET") (line 11)
2025-Nov-22 17:20:53.173521
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ARG "NEXT_PUBLIC_SUPABASE_ANON_KEY") (line 11)
2025-Nov-22 17:20:53.173521
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ENV "NEXTAUTH_SECRET") (line 12)
2025-Nov-22 17:20:53.173521
- UndefinedVar: Usage of undefined variable '$NIXPACKS_PATH' (line 18)
2025-Nov-22 17:20:53.173521
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ARG "SMTP_PASSWORD") (line 11)
2025-Nov-22 17:20:53.173521
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ARG "SUPABASE_SERVICE_ROLE_KEY") (line 11)
2025-Nov-22 17:20:53.173521
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ENV "NEXT_PUBLIC_SUPABASE_ANON_KEY") (line 12)
2025-Nov-22 17:20:53.173521
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ENV "SMTP_PASSWORD") (line 12)
2025-Nov-22 17:20:53.182120
Dockerfile:24
2025-Nov-22 17:20:53.182120
--------------------
2025-Nov-22 17:20:53.182120
22 |     # build phase
2025-Nov-22 17:20:53.182120
23 |     COPY . /app/.
2025-Nov-22 17:20:53.182120
24 | >>> RUN --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-next/cache,target=/app/.next/cache --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-node_modules/cache,target=/app/node_modules/.cache yarn run build
2025-Nov-22 17:20:53.182120
25 |
2025-Nov-22 17:20:53.182120
26 |
2025-Nov-22 17:20:53.182120
--------------------
2025-Nov-22 17:20:53.182120
ERROR: failed to build: failed to solve: process "/bin/bash -ol pipefail -c yarn run build" did not complete successfully: exit code: 1
2025-Nov-22 17:20:53.202113
exit status 1
2025-Nov-22 17:20:53.294162
Oops something is not okay, are you okay? 😢
2025-Nov-22 17:20:53.306067
#0 building with "default" instance using docker driver
2025-Nov-22 17:20:53.306067
2025-Nov-22 17:20:53.306067
#1 [internal] load build definition from Dockerfile
2025-Nov-22 17:20:53.306067
#1 transferring dockerfile: 2.02kB done
2025-Nov-22 17:20:53.306067
#1 DONE 0.0s
2025-Nov-22 17:20:53.306067
2025-Nov-22 17:20:53.306067
#2 [internal] load metadata for ghcr.io/railwayapp/nixpacks:ubuntu-1745885067
2025-Nov-22 17:20:53.306067
#2 DONE 0.4s
2025-Nov-22 17:20:53.306067
2025-Nov-22 17:20:53.306067
#3 [internal] load .dockerignore
2025-Nov-22 17:20:53.306067
#3 transferring context: 2B done
2025-Nov-22 17:20:53.306067
#3 DONE 0.0s
2025-Nov-22 17:20:53.306067
2025-Nov-22 17:20:53.306067
#4 [stage-0  1/11] FROM ghcr.io/railwayapp/nixpacks:ubuntu-1745885067@sha256:d45c89d80e13d7ad0fd555b5130f22a866d9dd10e861f589932303ef2314c7de
2025-Nov-22 17:20:53.306067
#4 DONE 0.0s
2025-Nov-22 17:20:53.306067
2025-Nov-22 17:20:53.306067
#5 [internal] load build context
2025-Nov-22 17:20:53.306067
#5 transferring context: 3.33MB 0.1s done
2025-Nov-22 17:20:53.306067
#5 DONE 0.1s
2025-Nov-22 17:20:53.306067
2025-Nov-22 17:20:53.306067
#6 [stage-0  2/11] WORKDIR /app/
2025-Nov-22 17:20:53.306067
#6 CACHED
2025-Nov-22 17:20:53.306067
2025-Nov-22 17:20:53.306067
#7 [stage-0  3/11] COPY .nixpacks/nixpkgs-23f9169c4ccce521379e602cc82ed873a1f1b52b.nix .nixpacks/nixpkgs-23f9169c4ccce521379e602cc82ed873a1f1b52b.nix
2025-Nov-22 17:20:53.306067
#7 CACHED
2025-Nov-22 17:20:53.306067
2025-Nov-22 17:20:53.306067
#8 [stage-0  4/11] RUN nix-env -if .nixpacks/nixpkgs-23f9169c4ccce521379e602cc82ed873a1f1b52b.nix && nix-collect-garbage -d
2025-Nov-22 17:20:53.306067
#8 CACHED
2025-Nov-22 17:20:53.306067
2025-Nov-22 17:20:53.306067
#9 [stage-0  5/11] RUN sudo apt-get update && sudo apt-get install -y --no-install-recommends curl wget
2025-Nov-22 17:20:53.306067
#9 CACHED
2025-Nov-22 17:20:53.306067
2025-Nov-22 17:20:53.306067
#10 [stage-0  6/11] COPY . /app/.
2025-Nov-22 17:20:53.306067
#10 DONE 0.1s
2025-Nov-22 17:20:53.306067
2025-Nov-22 17:20:53.306067
#11 [stage-0  7/11] RUN --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-/usr/local/share/cache/yarn/v6,target=/usr/local/share/.cache/yarn/v6 yarn install --frozen-lockfile
2025-Nov-22 17:20:53.306067
#11 0.510 yarn install v1.22.22
2025-Nov-22 17:20:53.306067
#11 0.594 [1/5] Validating package.json...
2025-Nov-22 17:20:53.306067
#11 0.600 [2/5] Resolving packages...
2025-Nov-22 17:20:53.306067
#11 0.835 (node:1) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.
2025-Nov-22 17:20:53.306067
#11 0.835 (Use `node --trace-deprecation ...` to show where the warning was created)
2025-Nov-22 17:20:53.306067
#11 0.839 [3/5] Fetching packages...
2025-Nov-22 17:20:53.306067
#11 1.371 [4/5] Linking dependencies...
2025-Nov-22 17:20:53.306067
#11 1.399 warning Workspaces can only be enabled in private projects.
2025-Nov-22 17:20:53.306067
#11 1.406 warning Workspaces can only be enabled in private projects.
2025-Nov-22 17:20:53.306067
#11 6.481 [5/5] Building fresh packages...
2025-Nov-22 17:20:53.306067
#11 6.648 Done in 6.14s.
2025-Nov-22 17:20:53.306067
#11 DONE 6.8s
2025-Nov-22 17:20:53.306067
2025-Nov-22 17:20:53.306067
#12 [stage-0  8/11] COPY . /app/.
2025-Nov-22 17:20:53.306067
#12 DONE 0.1s
2025-Nov-22 17:20:53.306067
2025-Nov-22 17:20:53.306067
#13 [stage-0  9/11] RUN --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-next/cache,target=/app/.next/cache --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-node_modules/cache,target=/app/node_modules/.cache yarn run build
2025-Nov-22 17:20:53.306067
#13 0.543 yarn run v1.22.22
2025-Nov-22 17:20:53.306067
#13 0.610 $ next build
2025-Nov-22 17:20:53.306067
#13 1.630  ⚠ Invalid next.config.js options detected:
2025-Nov-22 17:20:53.306067
#13 1.630  ⚠     Unrecognized key(s) in object: 'serverComponentsExternalPackages' at "experimental"
2025-Nov-22 17:20:53.306067
#13 1.630  ⚠ See more info here: https://nextjs.org/docs/messages/invalid-next-config
2025-Nov-22 17:20:53.306067
#13 1.632  ⚠ `experimental.serverComponentsExternalPackages` has been moved to `serverExternalPackages`. Please update your next.config.js file accordingly.
2025-Nov-22 17:20:53.306067
#13 1.726    ▲ Next.js 15.3.4
2025-Nov-22 17:20:53.306067
#13 1.726
2025-Nov-22 17:20:53.306067
#13 1.763    Creating an optimized production build ...
2025-Nov-22 17:20:53.306067
#13 12.10 Failed to compile.
2025-Nov-22 17:20:53.306067
#13 12.10
2025-Nov-22 17:20:53.306067
#13 12.10 ./src/app/about/page.tsx
2025-Nov-22 17:20:53.306067
#13 12.10 Module not found: Can't resolve '@/components/ui/button'
2025-Nov-22 17:20:53.306067
#13 12.10
2025-Nov-22 17:20:53.306067
#13 12.10 https://nextjs.org/docs/messages/module-not-found
2025-Nov-22 17:20:53.306067
#13 12.10
2025-Nov-22 17:20:53.306067
#13 12.10 ./src/app/about/page.tsx
2025-Nov-22 17:20:53.306067
#13 12.10 Module not found: Can't resolve '@/components/ui/card'
2025-Nov-22 17:20:53.306067
#13 12.10
2025-Nov-22 17:20:53.306067
#13 12.10 https://nextjs.org/docs/messages/module-not-found
2025-Nov-22 17:20:53.306067
#13 12.10
2025-Nov-22 17:20:53.306067
#13 12.10 ./src/app/about/page.tsx
2025-Nov-22 17:20:53.306067
#13 12.10 Module not found: Can't resolve '@/components/ui/badge'
2025-Nov-22 17:20:53.306067
#13 12.10
2025-Nov-22 17:20:53.306067
#13 12.10 https://nextjs.org/docs/messages/module-not-found
2025-Nov-22 17:20:53.306067
#13 12.10
2025-Nov-22 17:20:53.306067
#13 12.10 ./src/app/about/page.tsx
2025-Nov-22 17:20:53.306067
#13 12.10 Module not found: Can't resolve '@/components/ui/contact-popup'
2025-Nov-22 17:20:53.306067
#13 12.10
2025-Nov-22 17:20:53.306067
#13 12.10 https://nextjs.org/docs/messages/module-not-found
2025-Nov-22 17:20:53.306067
#13 12.10
2025-Nov-22 17:20:53.306067
#13 12.10 ./src/app/about/page.tsx
2025-Nov-22 17:20:53.306067
#13 12.10 Module not found: Can't resolve '@/components/auth/email-verification-popup'
2025-Nov-22 17:20:53.306067
#13 12.10
2025-Nov-22 17:20:53.306067
#13 12.10 https://nextjs.org/docs/messages/module-not-found
2025-Nov-22 17:20:53.306067
#13 12.10
2025-Nov-22 17:20:53.306067
#13 12.13
2025-Nov-22 17:20:53.306067
#13 12.13 > Build failed because of webpack errors
2025-Nov-22 17:20:53.306067
#13 12.18 error Command failed with exit code 1.
2025-Nov-22 17:20:53.306067
#13 12.18 info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
2025-Nov-22 17:20:53.306067
#13 ERROR: process "/bin/bash -ol pipefail -c yarn run build" did not complete successfully: exit code: 1
2025-Nov-22 17:20:53.306067
------
2025-Nov-22 17:20:53.306067
> [stage-0  9/11] RUN --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-next/cache,target=/app/.next/cache --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-node_modules/cache,target=/app/node_modules/.cache yarn run build:
2025-Nov-22 17:20:53.306067
12.10
2025-Nov-22 17:20:53.306067
12.10 ./src/app/about/page.tsx
2025-Nov-22 17:20:53.306067
12.10 Module not found: Can't resolve '@/components/auth/email-verification-popup'
2025-Nov-22 17:20:53.306067
12.10
2025-Nov-22 17:20:53.306067
12.10 https://nextjs.org/docs/messages/module-not-found
2025-Nov-22 17:20:53.306067
12.10
2025-Nov-22 17:20:53.306067
12.13
2025-Nov-22 17:20:53.306067
12.13 > Build failed because of webpack errors
2025-Nov-22 17:20:53.306067
12.18 error Command failed with exit code 1.
2025-Nov-22 17:20:53.306067
12.18 info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
2025-Nov-22 17:20:53.306067
------
2025-Nov-22 17:20:53.306067
2025-Nov-22 17:20:53.306067
9 warnings found (use docker --debug to expand):
2025-Nov-22 17:20:53.306067
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ENV "SUPABASE_SERVICE_ROLE_KEY") (line 12)
2025-Nov-22 17:20:53.306067
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ARG "NEXTAUTH_SECRET") (line 11)
2025-Nov-22 17:20:53.306067
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ARG "NEXT_PUBLIC_SUPABASE_ANON_KEY") (line 11)
2025-Nov-22 17:20:53.306067
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ENV "NEXTAUTH_SECRET") (line 12)
2025-Nov-22 17:20:53.306067
- UndefinedVar: Usage of undefined variable '$NIXPACKS_PATH' (line 18)
2025-Nov-22 17:20:53.306067
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ARG "SMTP_PASSWORD") (line 11)
2025-Nov-22 17:20:53.306067
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ARG "SUPABASE_SERVICE_ROLE_KEY") (line 11)
2025-Nov-22 17:20:53.306067
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ENV "NEXT_PUBLIC_SUPABASE_ANON_KEY") (line 12)
2025-Nov-22 17:20:53.306067
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ENV "SMTP_PASSWORD") (line 12)
2025-Nov-22 17:20:53.306067
Dockerfile:24
2025-Nov-22 17:20:53.306067
--------------------
2025-Nov-22 17:20:53.306067
22 |     # build phase
2025-Nov-22 17:20:53.306067
23 |     COPY . /app/.
2025-Nov-22 17:20:53.306067
24 | >>> RUN --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-next/cache,target=/app/.next/cache --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-node_modules/cache,target=/app/node_modules/.cache yarn run build
2025-Nov-22 17:20:53.306067
25 |
2025-Nov-22 17:20:53.306067
26 |
2025-Nov-22 17:20:53.306067
--------------------
2025-Nov-22 17:20:53.306067
ERROR: failed to build: failed to solve: process "/bin/bash -ol pipefail -c yarn run build" did not complete successfully: exit code: 1
2025-Nov-22 17:20:53.306067
exit status 1
2025-Nov-22 17:20:53.319618
Deployment failed. Removing the new version of your application.
2025-Nov-22 17:20:54.546089
Gracefully shutting down build container: vws8kg88o8skc0wgcggscs8k
2025-Nov-22 17:20:55.070197
[CMD]: docker stop --time=30 vws8kg88o8skc0wgcggscs8k
2025-Nov-22 17:20:55.070197
vws8kg88o8skc0wgcggscs8k
2025-Nov-22 17:20:55.486257
[CMD]: docker rm -f vws8kg88o8skc0wgcggscs8k
