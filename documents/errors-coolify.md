Oops something is not okay, are you okay? 😢
2025-Nov-22 17:07:01.286572
#0 building with "default" instance using docker driver
2025-Nov-22 17:07:01.286572
2025-Nov-22 17:07:01.286572
#1 [internal] load build definition from Dockerfile
2025-Nov-22 17:07:01.286572
#1 transferring dockerfile: 2.02kB done
2025-Nov-22 17:07:01.286572
#1 DONE 0.0s
2025-Nov-22 17:07:01.286572
2025-Nov-22 17:07:01.286572
#2 [internal] load metadata for ghcr.io/railwayapp/nixpacks:ubuntu-1745885067
2025-Nov-22 17:07:01.286572
#2 DONE 0.4s
2025-Nov-22 17:07:01.286572
2025-Nov-22 17:07:01.286572
#3 [internal] load .dockerignore
2025-Nov-22 17:07:01.286572
#3 transferring context: 2B done
2025-Nov-22 17:07:01.286572
#3 DONE 0.0s
2025-Nov-22 17:07:01.286572
2025-Nov-22 17:07:01.286572
#4 [stage-0  1/11] FROM ghcr.io/railwayapp/nixpacks:ubuntu-1745885067@sha256:d45c89d80e13d7ad0fd555b5130f22a866d9dd10e861f589932303ef2314c7de
2025-Nov-22 17:07:01.286572
#4 DONE 0.0s
2025-Nov-22 17:07:01.286572
2025-Nov-22 17:07:01.286572
#5 [stage-0  2/11] WORKDIR /app/
2025-Nov-22 17:07:01.286572
#5 CACHED
2025-Nov-22 17:07:01.286572
2025-Nov-22 17:07:01.286572
#6 [internal] load build context
2025-Nov-22 17:07:01.286572
#6 transferring context: 3.33MB 0.1s done
2025-Nov-22 17:07:01.286572
#6 DONE 0.2s
2025-Nov-22 17:07:01.286572
2025-Nov-22 17:07:01.286572
#7 [stage-0  3/11] COPY .nixpacks/nixpkgs-23f9169c4ccce521379e602cc82ed873a1f1b52b.nix .nixpacks/nixpkgs-23f9169c4ccce521379e602cc82ed873a1f1b52b.nix
2025-Nov-22 17:07:01.286572
#7 DONE 0.1s
2025-Nov-22 17:07:01.286572
2025-Nov-22 17:07:01.286572
#8 [stage-0  4/11] RUN nix-env -if .nixpacks/nixpkgs-23f9169c4ccce521379e602cc82ed873a1f1b52b.nix && nix-collect-garbage -d
2025-Nov-22 17:07:01.286572
#8 0.643 unpacking 'https://github.com/NixOS/nixpkgs/archive/23f9169c4ccce521379e602cc82ed873a1f1b52b.tar.gz' into the Git cache...
2025-Nov-22 17:07:01.286572
#8 49.31 unpacking 'https://github.com/railwayapp/nix-npm-overlay/archive/main.tar.gz' into the Git cache...
2025-Nov-22 17:07:01.286572
#8 50.19 installing '23f9169c4ccce521379e602cc82ed873a1f1b52b-env'
2025-Nov-22 17:07:01.286572
#8 51.28 these 4 derivations will be built:
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/l53bwr725gp7k4831cygqrihvaxv36b9-libraries.drv
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/93ik6f5038k47a4d72i9r9fjl15fvr3f-23f9169c4ccce521379e602cc82ed873a1f1b52b-env.drv
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/mvk5lmbgi5344fpp8glw8hqw2jpczsg6-yarn.drv
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/9w5s6v5ahkhkz6g6qklx4f4skfiw2y5y-23f9169c4ccce521379e602cc82ed873a1f1b52b-env.drv
2025-Nov-22 17:07:01.286572
#8 51.28 these 65 paths will be fetched (124.14 MiB download, 594.75 MiB unpacked):
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/jj3knbpiiwbwmplin208h775gzm86rc3-acl-2.3.2
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/2mwbf3viqfqd3lr946slqby9y4k7d9lw-attr-2.5.2
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/cl2gkgnh26mmpka81pc2g5bzjfrili92-bash-5.3p3
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/2j7r5np0vaz4cnqkymp1mqivmjj1x9xl-bash-interactive-5.3p3
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/7h3qnwgvkw6z2r8lq4j5mks4l6r5x2cq-binutils-2.44
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/9a4lmf0swjwjizlkv11ibhnmj0ql7p1s-binutils-2.44-lib
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/0fq1mnfqjl9ain4jg5j56kl6h8bbmy1h-binutils-wrapper-2.44
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/1dw13nzqf9v8w7jcy205hkp7s7ggi0cc-builder.pl
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/j59qq0cqb364kzzrx2r32swfljwklxlq-bzip2-1.0.8
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/xnd0ld68fzj1g1qr19gg0va486snwj22-bzip2-1.0.8-bin
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/00bc157nm93q5fjz551fwk60ihlbilvj-coreutils-9.7
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/c7qlkpbivy2znqxd25prgh9pwjxdri6w-diffutils-3.12
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/wgvx9p6h00aijb9jw95am7095wjzm9mv-ed-1.22.2
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/5ipaaiqy3dmngyp3a3yschy4g4kh1jl7-expand-response-params
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/5qm0vivgc7lmiyfbf5d5a55s40d996bd-file-5.45
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/wq1cxh4s8rz8vs4ssp2z49v96m0nhxhj-findutils-4.10.0
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/swbmnc2s8g2zxzxh62hx1vbbcg6i2r5b-gawk-5.3.2
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/k6gpflj398qaxzx4bmqhnnj4l328vabk-gcc-14.3.0
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/xp989kyfg52803fmkzbz5py35jphcpgd-gcc-14.3.0-lib
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/8b9srwwmrwmh1yl613cwwj7gydl87br6-gcc-14.3.0-libgcc
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/dmypp1h4ldn0vfk3fi6yfyf5yxp9yz0k-gcc-wrapper-14.3.0
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/qhw0sp183mqd04x5jp75981kwya64npv-glibc-2.40-66
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/gf1xp3sizlc0nkq3man8ys0mwhs1bp44-glibc-2.40-66-bin
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/0zv32kh0zb4s1v4ld6mc99vmzydj9nm9-glibc-2.40-66-dev
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/szvrzng4wfxc9xljqjipxhrrayjfy0vj-gmp-6.3.0
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/78xkc7z5m21chq7p6awrzgznz83xyml0-gmp-with-cxx-6.3.0
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/2j08vib6rf81vwi6mv3s544wi8rj3xn7-gnu-config-2024-01-01
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/6q57mnfak3q8ss656qgp245qzqvnniyr-gnugrep-3.12
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/lmn1m0giq5bkgdqvdpiryb9a2ly28w6g-gnumake-4.4.1
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/7zy6jnnpqh16b18j6ar289vhwp17msh0-gnused-4.9
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/n09s57l86zxyjydkxagawxpkhh3d3dlh-gnutar-1.35
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/wd4i398mh329vhw93mvmamw3hrnhl257-gzip-1.14
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/hpyfq2n0qr4qj3z1f7d2diw8sql5m84f-icu4c-76.1
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/zc7w3ii28j4kagmlznjdajf0nzd0z60a-icu4c-76.1-dev
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/0fml1xim5c5wdn32a5bm7wgwn1ai0am6-isl-0.20
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/wwqyxsvmg41q5ckfvvv6wa50nwvz9dv4-libidn2-2.3.8
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/f21qz37q6da2bwm4cngj21ia6ivq3v23-libmpc-1.3.1
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/7ndy5820h69n1pgd13viph1qjq6zhhkj-libunistring-1.3
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/2pi0ddhdi6m4fnxw9w42qksz9jk1ja1i-libuv-1.51.0
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/adklcnjpc31n6jabha2qd60y2s9wm133-libuv-1.51.0-dev
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/nkn950vf2i29k4v3z6w9717pjrg483ng-libxcrypt-4.4.38
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/qzkhd1k8dsdah1ja0wjj6q8bibxk5zq6-linux-headers-6.16.7
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/vc3mb134w3cd0m1mh3kph079xr7mbvnn-mpfr-4.2.2
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/lm4wm3f4ynilxw8yvgqq0hj2ng8ky9xy-ncurses-6.5
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/p2sk3402d788hqn5diy5gba8cskjffzz-nodejs-24.10.0
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/0837wpkjb27cr70bi3pc4g2rw5v9r63l-openssl-3.5.2
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/3kasb92ri5cmp7gwxgj8jgk87pr83y7p-openssl-3.5.2-bin
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/cz9k6nhxjppa1kmyf5npd0g8l89xzilw-openssl-3.5.2-dev
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/r9lif1a0naanr8kdapwnbnr39lr7d56a-patch-2.8
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/0032synbfqd0ylgf9szgp724nmw2fq89-patchelf-0.15.2
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/wqlkv0cjacnm7arca156p3d3vh0kdbmk-pcre2-10.46
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/k2y9xpcdqxma66kag80nhbv0pq2bznzf-perl-5.40.0
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/zqkjn730gir222v3mkp82c1pmqfb2j0l-readline-8.3p1
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/jqrf546vxc6nzf4575m4am3w4ywq765i-sqlite-3.50.4
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/7p5yg8li32wgxxsydbzblnjgs8hvl9wd-sqlite-3.50.4-bin
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/3a7y8k7fh6xldnpvd3bx3ygnx5044xw6-sqlite-3.50.4-dev
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/87ds8jf53m7n8xscxgkfgwcc8dyj1qki-stdenv-linux
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/x1d0ad98h92lp5g59pfryjzk4ca84i3r-stdenv-linux
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/ka03rs4a3bybjhqpvg388sdszbybvbff-update-autotools-gnu-config-scripts-hook
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/0ja5daq2yay3svg6f48spyfby7pgy5bm-xgcc-14.3.0-libgcc
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/swqs30pymm3ymv2qnkzs353xmpgr80jr-xz-5.8.1
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/77jyjqy2b9l2a0139im9ds28zkdv0ybc-xz-5.8.1-bin
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/vlvg5xhhbjr9lpgqwz1a21pfaajz3xgx-yarn-1.22.22.tgz
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/6qi8skh85ci2k9gvl27nnh3kiy32qnsz-zlib-1.3.1
2025-Nov-22 17:07:01.286572
#8 51.28   /nix/store/6fqij3sy1mlsnq1n679bzbl5bkqs7yvk-zlib-1.3.1-dev
2025-Nov-22 17:07:01.286572
#8 51.30 copying path '/nix/store/1dw13nzqf9v8w7jcy205hkp7s7ggi0cc-builder.pl' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 51.31 copying path '/nix/store/8b9srwwmrwmh1yl613cwwj7gydl87br6-gcc-14.3.0-libgcc' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 51.31 copying path '/nix/store/2j08vib6rf81vwi6mv3s544wi8rj3xn7-gnu-config-2024-01-01' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 51.31 copying path '/nix/store/0ja5daq2yay3svg6f48spyfby7pgy5bm-xgcc-14.3.0-libgcc' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 51.31 copying path '/nix/store/7ndy5820h69n1pgd13viph1qjq6zhhkj-libunistring-1.3' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 51.31 copying path '/nix/store/vlvg5xhhbjr9lpgqwz1a21pfaajz3xgx-yarn-1.22.22.tgz' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 51.32 copying path '/nix/store/qzkhd1k8dsdah1ja0wjj6q8bibxk5zq6-linux-headers-6.16.7' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 51.33 copying path '/nix/store/ka03rs4a3bybjhqpvg388sdszbybvbff-update-autotools-gnu-config-scripts-hook' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 51.38 copying path '/nix/store/wwqyxsvmg41q5ckfvvv6wa50nwvz9dv4-libidn2-2.3.8' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 51.42 copying path '/nix/store/qhw0sp183mqd04x5jp75981kwya64npv-glibc-2.40-66' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.08 copying path '/nix/store/2mwbf3viqfqd3lr946slqby9y4k7d9lw-attr-2.5.2' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.08 copying path '/nix/store/7zy6jnnpqh16b18j6ar289vhwp17msh0-gnused-4.9' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.08 copying path '/nix/store/swbmnc2s8g2zxzxh62hx1vbbcg6i2r5b-gawk-5.3.2' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.08 copying path '/nix/store/lmn1m0giq5bkgdqvdpiryb9a2ly28w6g-gnumake-4.4.1' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.08 copying path '/nix/store/cl2gkgnh26mmpka81pc2g5bzjfrili92-bash-5.3p3' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.08 copying path '/nix/store/nkn950vf2i29k4v3z6w9717pjrg483ng-libxcrypt-4.4.38' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.08 copying path '/nix/store/lm4wm3f4ynilxw8yvgqq0hj2ng8ky9xy-ncurses-6.5' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.08 copying path '/nix/store/2pi0ddhdi6m4fnxw9w42qksz9jk1ja1i-libuv-1.51.0' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.08 copying path '/nix/store/szvrzng4wfxc9xljqjipxhrrayjfy0vj-gmp-6.3.0' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.08 copying path '/nix/store/0837wpkjb27cr70bi3pc4g2rw5v9r63l-openssl-3.5.2' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.08 copying path '/nix/store/wqlkv0cjacnm7arca156p3d3vh0kdbmk-pcre2-10.46' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.08 copying path '/nix/store/xp989kyfg52803fmkzbz5py35jphcpgd-gcc-14.3.0-lib' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.08 copying path '/nix/store/gf1xp3sizlc0nkq3man8ys0mwhs1bp44-glibc-2.40-66-bin' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.08 copying path '/nix/store/5ipaaiqy3dmngyp3a3yschy4g4kh1jl7-expand-response-params' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.08 copying path '/nix/store/wgvx9p6h00aijb9jw95am7095wjzm9mv-ed-1.22.2' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.09 copying path '/nix/store/j59qq0cqb364kzzrx2r32swfljwklxlq-bzip2-1.0.8' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.13 copying path '/nix/store/swqs30pymm3ymv2qnkzs353xmpgr80jr-xz-5.8.1' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.15 copying path '/nix/store/6qi8skh85ci2k9gvl27nnh3kiy32qnsz-zlib-1.3.1' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.15 copying path '/nix/store/adklcnjpc31n6jabha2qd60y2s9wm133-libuv-1.51.0-dev' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.17 copying path '/nix/store/6q57mnfak3q8ss656qgp245qzqvnniyr-gnugrep-3.12' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.17 copying path '/nix/store/jj3knbpiiwbwmplin208h775gzm86rc3-acl-2.3.2' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.17 copying path '/nix/store/xnd0ld68fzj1g1qr19gg0va486snwj22-bzip2-1.0.8-bin' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.18 copying path '/nix/store/vc3mb134w3cd0m1mh3kph079xr7mbvnn-mpfr-4.2.2' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.21 copying path '/nix/store/0fml1xim5c5wdn32a5bm7wgwn1ai0am6-isl-0.20' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.21 copying path '/nix/store/9a4lmf0swjwjizlkv11ibhnmj0ql7p1s-binutils-2.44-lib' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.21 copying path '/nix/store/r9lif1a0naanr8kdapwnbnr39lr7d56a-patch-2.8' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.22 copying path '/nix/store/5qm0vivgc7lmiyfbf5d5a55s40d996bd-file-5.45' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.25 copying path '/nix/store/jqrf546vxc6nzf4575m4am3w4ywq765i-sqlite-3.50.4' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.27 copying path '/nix/store/n09s57l86zxyjydkxagawxpkhh3d3dlh-gnutar-1.35' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.29 copying path '/nix/store/7p5yg8li32wgxxsydbzblnjgs8hvl9wd-sqlite-3.50.4-bin' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.30 copying path '/nix/store/wd4i398mh329vhw93mvmamw3hrnhl257-gzip-1.14' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.30 copying path '/nix/store/6fqij3sy1mlsnq1n679bzbl5bkqs7yvk-zlib-1.3.1-dev' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.31 copying path '/nix/store/77jyjqy2b9l2a0139im9ds28zkdv0ybc-xz-5.8.1-bin' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.37 copying path '/nix/store/f21qz37q6da2bwm4cngj21ia6ivq3v23-libmpc-1.3.1' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.46 copying path '/nix/store/0zv32kh0zb4s1v4ld6mc99vmzydj9nm9-glibc-2.40-66-dev' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.61 copying path '/nix/store/3a7y8k7fh6xldnpvd3bx3ygnx5044xw6-sqlite-3.50.4-dev' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.66 copying path '/nix/store/7h3qnwgvkw6z2r8lq4j5mks4l6r5x2cq-binutils-2.44' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.66 copying path '/nix/store/hpyfq2n0qr4qj3z1f7d2diw8sql5m84f-icu4c-76.1' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.66 copying path '/nix/store/78xkc7z5m21chq7p6awrzgznz83xyml0-gmp-with-cxx-6.3.0' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.67 copying path '/nix/store/0032synbfqd0ylgf9szgp724nmw2fq89-patchelf-0.15.2' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.72 copying path '/nix/store/00bc157nm93q5fjz551fwk60ihlbilvj-coreutils-9.7' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.76 copying path '/nix/store/k6gpflj398qaxzx4bmqhnnj4l328vabk-gcc-14.3.0' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.77 copying path '/nix/store/3kasb92ri5cmp7gwxgj8jgk87pr83y7p-openssl-3.5.2-bin' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.88 copying path '/nix/store/c7qlkpbivy2znqxd25prgh9pwjxdri6w-diffutils-3.12' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.89 copying path '/nix/store/cz9k6nhxjppa1kmyf5npd0g8l89xzilw-openssl-3.5.2-dev' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.89 copying path '/nix/store/wq1cxh4s8rz8vs4ssp2z49v96m0nhxhj-findutils-4.10.0' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 52.89 copying path '/nix/store/k2y9xpcdqxma66kag80nhbv0pq2bznzf-perl-5.40.0' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 53.00 copying path '/nix/store/zqkjn730gir222v3mkp82c1pmqfb2j0l-readline-8.3p1' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 53.03 copying path '/nix/store/x1d0ad98h92lp5g59pfryjzk4ca84i3r-stdenv-linux' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 53.19 building '/nix/store/l53bwr725gp7k4831cygqrihvaxv36b9-libraries.drv'...
2025-Nov-22 17:07:01.286572
#8 53.19 copying path '/nix/store/2j7r5np0vaz4cnqkymp1mqivmjj1x9xl-bash-interactive-5.3p3' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 53.38 copying path '/nix/store/0fq1mnfqjl9ain4jg5j56kl6h8bbmy1h-binutils-wrapper-2.44' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 53.60 building '/nix/store/93ik6f5038k47a4d72i9r9fjl15fvr3f-23f9169c4ccce521379e602cc82ed873a1f1b52b-env.drv'...
2025-Nov-22 17:07:01.286572
#8 53.75 copying path '/nix/store/zc7w3ii28j4kagmlznjdajf0nzd0z60a-icu4c-76.1-dev' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 53.97 copying path '/nix/store/p2sk3402d788hqn5diy5gba8cskjffzz-nodejs-24.10.0' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 57.99 copying path '/nix/store/dmypp1h4ldn0vfk3fi6yfyf5yxp9yz0k-gcc-wrapper-14.3.0' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 58.00 copying path '/nix/store/87ds8jf53m7n8xscxgkfgwcc8dyj1qki-stdenv-linux' from 'https://cache.nixos.org'...
2025-Nov-22 17:07:01.286572
#8 58.05 building '/nix/store/mvk5lmbgi5344fpp8glw8hqw2jpczsg6-yarn.drv'...
2025-Nov-22 17:07:01.286572
#8 58.17 Running phase: unpackPhase
2025-Nov-22 17:07:01.286572
#8 58.17 unpacking source archive /nix/store/vlvg5xhhbjr9lpgqwz1a21pfaajz3xgx-yarn-1.22.22.tgz
2025-Nov-22 17:07:01.286572
#8 58.20 source root is package
2025-Nov-22 17:07:01.286572
#8 58.21 setting SOURCE_DATE_EPOCH to timestamp 499162500 of file "package/preinstall.js"
2025-Nov-22 17:07:01.286572
#8 58.22 Running phase: installPhase
2025-Nov-22 17:07:01.286572
#8 58.32 building '/nix/store/9w5s6v5ahkhkz6g6qklx4f4skfiw2y5y-23f9169c4ccce521379e602cc82ed873a1f1b52b-env.drv'...
2025-Nov-22 17:07:01.286572
#8 58.46 created 19 symlinks in user environment
2025-Nov-22 17:07:01.286572
#8 58.69 building '/nix/store/hsihi00n5rl58idhij3fkz7rhpw7qki2-user-environment.drv'...
2025-Nov-22 17:07:01.286572
#8 58.90 removing old generations of profile /nix/var/nix/profiles/per-user/root/profile
2025-Nov-22 17:07:01.286572
#8 58.90 removing profile version 1
2025-Nov-22 17:07:01.286572
#8 58.90 removing old generations of profile /nix/var/nix/profiles/per-user/root/channels
2025-Nov-22 17:07:01.286572
#8 58.90 removing old generations of profile /nix/var/nix/profiles/per-user/root/profile
2025-Nov-22 17:07:01.286572
#8 58.90 removing old generations of profile /nix/var/nix/profiles/per-user/root/channels
2025-Nov-22 17:07:01.286572
#8 58.91 finding garbage collector roots...
2025-Nov-22 17:07:01.286572
#8 58.91 removing stale link from '/nix/var/nix/gcroots/auto/lzjbmb2ry0z7lma2fvpqprb12921pnb5' to '/nix/var/nix/profiles/per-user/root/profile-1-link'
2025-Nov-22 17:07:01.286572
#8 58.91 deleting garbage...
2025-Nov-22 17:07:01.286572
#8 58.92 deleting '/nix/store/a9qf4wwhympzs35ncp80r185j6a21w07-user-environment'
2025-Nov-22 17:07:01.286572
#8 58.92 deleting '/nix/store/253kwn1730vnay87xkjgxa2v97w3y079-user-environment.drv'
2025-Nov-22 17:07:01.286572
#8 58.94 deleting '/nix/store/hn5mrh362n52x8wwab9s1v6bgn4n5c94-env-manifest.nix'
2025-Nov-22 17:07:01.286572
#8 58.94 deleting '/nix/store/k2y9xpcdqxma66kag80nhbv0pq2bznzf-perl-5.40.0'
2025-Nov-22 17:07:01.286572
#8 58.97 deleting '/nix/store/x1d0ad98h92lp5g59pfryjzk4ca84i3r-stdenv-linux'
2025-Nov-22 17:07:01.286572
#8 58.97 deleting '/nix/store/87ds8jf53m7n8xscxgkfgwcc8dyj1qki-stdenv-linux'
2025-Nov-22 17:07:01.286572
#8 58.97 deleting '/nix/store/r9lif1a0naanr8kdapwnbnr39lr7d56a-patch-2.8'
2025-Nov-22 17:07:01.286572
#8 58.97 deleting '/nix/store/ka03rs4a3bybjhqpvg388sdszbybvbff-update-autotools-gnu-config-scripts-hook'
2025-Nov-22 17:07:01.286572
#8 58.97 deleting '/nix/store/i6c20krnakaiv6zbraxl2q60hn8rmjwq-exec.drv'
2025-Nov-22 17:07:01.286572
#8 58.97 deleting '/nix/store/lmn1m0giq5bkgdqvdpiryb9a2ly28w6g-gnumake-4.4.1'
2025-Nov-22 17:07:01.286572
#8 58.97 deleting '/nix/store/wgvx9p6h00aijb9jw95am7095wjzm9mv-ed-1.22.2'
2025-Nov-22 17:07:01.286572
#8 58.97 deleting '/nix/store/cvw5asqga7k27zb1jlippfrkqm084ml7-libraries'
2025-Nov-22 17:07:01.286572
#8 58.97 deleting '/nix/store/yjzdra36n5mhn1lm12agv1lg8kv9m0cg-source'
2025-Nov-22 17:07:01.286572
#8 58.97 deleting '/nix/store/dmypp1h4ldn0vfk3fi6yfyf5yxp9yz0k-gcc-wrapper-14.3.0'
2025-Nov-22 17:07:01.286572
#8 58.97 deleting '/nix/store/k6gpflj398qaxzx4bmqhnnj4l328vabk-gcc-14.3.0'
2025-Nov-22 17:07:01.286572
#8 58.99 deleting '/nix/store/f21qz37q6da2bwm4cngj21ia6ivq3v23-libmpc-1.3.1'
2025-Nov-22 17:07:01.286572
#8 58.99 deleting '/nix/store/77jyjqy2b9l2a0139im9ds28zkdv0ybc-xz-5.8.1-bin'
2025-Nov-22 17:07:01.286572
#8 58.99 deleting '/nix/store/0fml1xim5c5wdn32a5bm7wgwn1ai0am6-isl-0.20'
2025-Nov-22 17:07:01.286572
#8 58.99 deleting '/nix/store/swbmnc2s8g2zxzxh62hx1vbbcg6i2r5b-gawk-5.3.2'
2025-Nov-22 17:07:01.286572
#8 59.00 deleting '/nix/store/xnd0ld68fzj1g1qr19gg0va486snwj22-bzip2-1.0.8-bin'
2025-Nov-22 17:07:01.286572
#8 59.00 deleting '/nix/store/j59qq0cqb364kzzrx2r32swfljwklxlq-bzip2-1.0.8'
2025-Nov-22 17:07:01.286572
#8 59.00 deleting '/nix/store/0fq1mnfqjl9ain4jg5j56kl6h8bbmy1h-binutils-wrapper-2.44'
2025-Nov-22 17:07:01.286572
#8 59.00 deleting '/nix/store/5ipaaiqy3dmngyp3a3yschy4g4kh1jl7-expand-response-params'
2025-Nov-22 17:07:01.286572
#8 59.00 deleting '/nix/store/wq1cxh4s8rz8vs4ssp2z49v96m0nhxhj-findutils-4.10.0'
2025-Nov-22 17:07:01.286572
#8 59.00 deleting '/nix/store/7h3qnwgvkw6z2r8lq4j5mks4l6r5x2cq-binutils-2.44'
2025-Nov-22 17:07:01.286572
#8 59.01 deleting '/nix/store/7zy6jnnpqh16b18j6ar289vhwp17msh0-gnused-4.9'
2025-Nov-22 17:07:01.286572
#8 59.01 deleting '/nix/store/n09s57l86zxyjydkxagawxpkhh3d3dlh-gnutar-1.35'
2025-Nov-22 17:07:01.286572
#8 59.02 deleting '/nix/store/0zv32kh0zb4s1v4ld6mc99vmzydj9nm9-glibc-2.40-66-dev'
2025-Nov-22 17:07:01.286572
#8 59.02 deleting '/nix/store/gf1xp3sizlc0nkq3man8ys0mwhs1bp44-glibc-2.40-66-bin'
2025-Nov-22 17:07:01.286572
#8 59.02 deleting '/nix/store/2j08vib6rf81vwi6mv3s544wi8rj3xn7-gnu-config-2024-01-01'
2025-Nov-22 17:07:01.286572
#8 59.02 deleting '/nix/store/0032synbfqd0ylgf9szgp724nmw2fq89-patchelf-0.15.2'
2025-Nov-22 17:07:01.286572
#8 59.02 deleting '/nix/store/vc3mb134w3cd0m1mh3kph079xr7mbvnn-mpfr-4.2.2'
2025-Nov-22 17:07:01.286572
#8 59.02 deleting '/nix/store/z6gs6c7h492l4zq99mrmbwfwkjykaf0d-source'
2025-Nov-22 17:07:01.286572
#8 60.64 deleting '/nix/store/6q57mnfak3q8ss656qgp245qzqvnniyr-gnugrep-3.12'
2025-Nov-22 17:07:01.286572
#8 60.64 deleting '/nix/store/wqlkv0cjacnm7arca156p3d3vh0kdbmk-pcre2-10.46'
2025-Nov-22 17:07:01.286572
#8 60.64 deleting '/nix/store/szvrzng4wfxc9xljqjipxhrrayjfy0vj-gmp-6.3.0'
2025-Nov-22 17:07:01.286572
#8 60.64 deleting '/nix/store/qzkhd1k8dsdah1ja0wjj6q8bibxk5zq6-linux-headers-6.16.7'
2025-Nov-22 17:07:01.286572
#8 60.65 deleting '/nix/store/swqs30pymm3ymv2qnkzs353xmpgr80jr-xz-5.8.1'
2025-Nov-22 17:07:01.286572
#8 60.66 deleting '/nix/store/wd4i398mh329vhw93mvmamw3hrnhl257-gzip-1.14'
2025-Nov-22 17:07:01.286572
#8 60.66 deleting '/nix/store/9a4lmf0swjwjizlkv11ibhnmj0ql7p1s-binutils-2.44-lib'
2025-Nov-22 17:07:01.286572
#8 60.66 deleting '/nix/store/c7qlkpbivy2znqxd25prgh9pwjxdri6w-diffutils-3.12'
2025-Nov-22 17:07:01.286572
#8 60.66 deleting '/nix/store/vlvg5xhhbjr9lpgqwz1a21pfaajz3xgx-yarn-1.22.22.tgz'
2025-Nov-22 17:07:01.286572
#8 60.66 deleting '/nix/store/5qm0vivgc7lmiyfbf5d5a55s40d996bd-file-5.45'
2025-Nov-22 17:07:01.286572
#8 60.66 deleting '/nix/store/nkn950vf2i29k4v3z6w9717pjrg483ng-libxcrypt-4.4.38'
2025-Nov-22 17:07:01.286572
#8 60.66 deleting '/nix/store/1dw13nzqf9v8w7jcy205hkp7s7ggi0cc-builder.pl'
2025-Nov-22 17:07:01.286572
#8 60.66 deleting unused links...
2025-Nov-22 17:07:01.286572
#8 63.25 note: currently hard linking saves -1.01 MiB
2025-Nov-22 17:07:01.286572
#8 63.34 45 store paths deleted, 541.48 MiB freed
2025-Nov-22 17:07:01.286572
#8 DONE 63.5s
2025-Nov-22 17:07:01.286572
2025-Nov-22 17:07:01.286572
#9 [stage-0  5/11] RUN sudo apt-get update && sudo apt-get install -y --no-install-recommends curl wget
2025-Nov-22 17:07:01.286572
#9 0.374 Get:1 http://archive.ubuntu.com/ubuntu noble InRelease [256 kB]
2025-Nov-22 17:07:01.286572
#9 0.455 Get:2 http://archive.ubuntu.com/ubuntu noble-updates InRelease [126 kB]
2025-Nov-22 17:07:01.286572
#9 0.477 Get:3 http://archive.ubuntu.com/ubuntu noble-backports InRelease [126 kB]
2025-Nov-22 17:07:01.286572
#9 0.522 Get:4 http://security.ubuntu.com/ubuntu noble-security InRelease [126 kB]
2025-Nov-22 17:07:01.286572
#9 0.570 Get:5 http://archive.ubuntu.com/ubuntu noble/main amd64 Packages [1808 kB]
2025-Nov-22 17:07:01.286572
#9 0.656 Get:6 http://archive.ubuntu.com/ubuntu noble/restricted amd64 Packages [117 kB]
2025-Nov-22 17:07:01.286572
#9 0.658 Get:7 http://archive.ubuntu.com/ubuntu noble/multiverse amd64 Packages [331 kB]
2025-Nov-22 17:07:01.286572
#9 0.665 Get:8 http://archive.ubuntu.com/ubuntu noble/universe amd64 Packages [19.3 MB]
2025-Nov-22 17:07:01.286572
#9 1.081 Get:9 http://archive.ubuntu.com/ubuntu noble-updates/multiverse amd64 Packages [35.9 kB]
2025-Nov-22 17:07:01.286572
#9 1.082 Get:10 http://archive.ubuntu.com/ubuntu noble-updates/restricted amd64 Packages [2925 kB]
2025-Nov-22 17:07:01.286572
#9 1.132 Get:11 http://security.ubuntu.com/ubuntu noble-security/restricted amd64 Packages [2732 kB]
2025-Nov-22 17:07:01.286572
#9 1.133 Get:12 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 Packages [2050 kB]
2025-Nov-22 17:07:01.286572
#9 1.175 Get:13 http://archive.ubuntu.com/ubuntu noble-updates/universe amd64 Packages [1942 kB]
2025-Nov-22 17:07:01.286572
#9 1.218 Get:14 http://archive.ubuntu.com/ubuntu noble-backports/universe amd64 Packages [33.9 kB]
2025-Nov-22 17:07:01.286572
#9 1.218 Get:15 http://archive.ubuntu.com/ubuntu noble-backports/main amd64 Packages [49.4 kB]
2025-Nov-22 17:07:01.286572
#9 1.754 Get:16 http://security.ubuntu.com/ubuntu noble-security/universe amd64 Packages [1174 kB]
2025-Nov-22 17:07:01.286572
#9 1.791 Get:17 http://security.ubuntu.com/ubuntu noble-security/main amd64 Packages [1659 kB]
2025-Nov-22 17:07:01.286572
#9 1.847 Get:18 http://security.ubuntu.com/ubuntu noble-security/multiverse amd64 Packages [33.1 kB]
2025-Nov-22 17:07:01.286572
#9 2.498 Fetched 34.8 MB in 2s (16.1 MB/s)
2025-Nov-22 17:07:01.286572
#9 2.498 Reading package lists...
2025-Nov-22 17:07:01.286572
#9 4.117 Reading package lists...
2025-Nov-22 17:07:01.286572
#9 5.711 Building dependency tree...
2025-Nov-22 17:07:01.286572
#9 6.199 Reading state information...
2025-Nov-22 17:07:01.286572
#9 7.003 curl is already the newest version (8.5.0-2ubuntu10.6).
2025-Nov-22 17:07:01.286572
#9 7.003 The following NEW packages will be installed:
2025-Nov-22 17:07:01.286572
#9 7.003   wget
2025-Nov-22 17:07:01.286572
#9 7.095 0 upgraded, 1 newly installed, 0 to remove and 40 not upgraded.
2025-Nov-22 17:07:01.286572
#9 7.095 Need to get 334 kB of archives.
2025-Nov-22 17:07:01.286572
#9 7.095 After this operation, 938 kB of additional disk space will be used.
2025-Nov-22 17:07:01.286572
#9 7.095 Get:1 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 wget amd64 1.21.4-1ubuntu4.1 [334 kB]
2025-Nov-22 17:07:01.286572
#9 7.468 debconf: delaying package configuration, since apt-utils is not installed
2025-Nov-22 17:07:01.286572
#9 7.545 Fetched 334 kB in 0s (3068 kB/s)
2025-Nov-22 17:07:01.286572
#9 7.584 Selecting previously unselected package wget.
2025-Nov-22 17:07:01.286572
#9 7.584 (Reading database ... 
(Reading database ... 5%
(Reading database ... 10%
(Reading database ... 15%
(Reading database ... 20%
(Reading database ... 25%
(Reading database ... 30%
(Reading database ... 35%
(Reading database ... 40%
(Reading database ... 45%
(Reading database ... 50%
(Reading database ... 55%
(Reading database ... 60%
(Reading database ... 65%
(Reading database ... 70%
(Reading database ... 75%
(Reading database ... 80%
(Reading database ... 85%
(Reading database ... 90%
(Reading database ... 95%
(Reading database ... 100%
(Reading database ... 9511 files and directories currently installed.)
2025-Nov-22 17:07:01.286572
#9 7.654 Preparing to unpack .../wget_1.21.4-1ubuntu4.1_amd64.deb ...
2025-Nov-22 17:07:01.286572
#9 7.657 Unpacking wget (1.21.4-1ubuntu4.1) ...
2025-Nov-22 17:07:01.286572
#9 7.718 Setting up wget (1.21.4-1ubuntu4.1) ...
2025-Nov-22 17:07:01.286572
#9 DONE 7.8s
2025-Nov-22 17:07:01.286572
2025-Nov-22 17:07:01.286572
#10 [stage-0  6/11] COPY . /app/.
2025-Nov-22 17:07:01.286572
#10 DONE 0.1s
2025-Nov-22 17:07:01.286572
2025-Nov-22 17:07:01.286572
#11 [stage-0  7/11] RUN --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-/usr/local/share/cache/yarn/v6,target=/usr/local/share/.cache/yarn/v6 yarn install --frozen-lockfile
2025-Nov-22 17:07:01.286572
#11 0.586 yarn install v1.22.22
2025-Nov-22 17:07:01.286572
#11 0.701 [1/5] Validating package.json...
2025-Nov-22 17:07:01.286572
#11 0.709 [2/5] Resolving packages...
2025-Nov-22 17:07:01.286572
#11 0.927 (node:1) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.
2025-Nov-22 17:07:01.286572
#11 0.927 (Use `node --trace-deprecation ...` to show where the warning was created)
2025-Nov-22 17:07:01.286572
#11 0.939 [3/5] Fetching packages...
2025-Nov-22 17:07:01.286572
#11 1.351 [4/5] Linking dependencies...
2025-Nov-22 17:07:01.286572
#11 1.361 warning " > recharts@3.4.1" has unmet peer dependency "react-is@^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0".
2025-Nov-22 17:07:01.286572
#11 1.376 warning Workspaces can only be enabled in private projects.
2025-Nov-22 17:07:01.286572
#11 1.381 warning Workspaces can only be enabled in private projects.
2025-Nov-22 17:07:01.286572
#11 6.196 [5/5] Building fresh packages...
2025-Nov-22 17:07:01.286572
#11 6.420 Done in 5.85s.
2025-Nov-22 17:07:01.286572
#11 DONE 6.6s
2025-Nov-22 17:07:01.286572
2025-Nov-22 17:07:01.286572
#12 [stage-0  8/11] COPY . /app/.
2025-Nov-22 17:07:01.286572
#12 DONE 0.1s
2025-Nov-22 17:07:01.286572
2025-Nov-22 17:07:01.286572
#13 [stage-0  9/11] RUN --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-next/cache,target=/app/.next/cache --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-node_modules/cache,target=/app/node_modules/.cache yarn run build
2025-Nov-22 17:07:01.286572
#13 0.477 yarn run v1.22.22
2025-Nov-22 17:07:01.286572
#13 0.525 $ next build
2025-Nov-22 17:07:01.286572
#13 1.577  ⚠ Invalid next.config.js options detected:
2025-Nov-22 17:07:01.286572
#13 1.578  ⚠     Unrecognized key(s) in object: 'serverComponentsExternalPackages' at "experimental"
2025-Nov-22 17:07:01.286572
#13 1.578  ⚠ See more info here: https://nextjs.org/docs/messages/invalid-next-config
2025-Nov-22 17:07:01.286572
#13 1.581  ⚠ `experimental.serverComponentsExternalPackages` has been moved to `serverExternalPackages`. Please update your next.config.js file accordingly.
2025-Nov-22 17:07:01.286572
#13 1.684    ▲ Next.js 15.3.4
2025-Nov-22 17:07:01.286572
#13 1.684
2025-Nov-22 17:07:01.286572
#13 1.721    Creating an optimized production build ...
2025-Nov-22 17:07:01.286572
#13 11.86 Failed to compile.
2025-Nov-22 17:07:01.286572
#13 11.86
2025-Nov-22 17:07:01.286572
#13 11.86 src/app/layout.tsx
2025-Nov-22 17:07:01.286572
#13 11.86 An error occurred in `next/font`.
2025-Nov-22 17:07:01.286572
#13 11.86
2025-Nov-22 17:07:01.286572
#13 11.86 Error: Cannot find module '@tailwindcss/postcss'
2025-Nov-22 17:07:01.286572
#13 11.86 Require stack:
2025-Nov-22 17:07:01.286572
#13 11.86 - /app/node_modules/next/dist/build/webpack/config/blocks/css/plugins.js
2025-Nov-22 17:07:01.286572
#13 11.86 - /app/node_modules/next/dist/build/webpack/config/blocks/css/index.js
2025-Nov-22 17:07:01.286572
#13 11.86 - /app/node_modules/next/dist/build/webpack/config/index.js
2025-Nov-22 17:07:01.286572
#13 11.86 - /app/node_modules/next/dist/build/webpack-config.js
2025-Nov-22 17:07:01.286572
#13 11.86 - /app/node_modules/next/dist/build/webpack-build/impl.js
2025-Nov-22 17:07:01.286572
#13 11.86 - /app/node_modules/next/dist/compiled/jest-worker/processChild.js
2025-Nov-22 17:07:01.286572
#13 11.86     at Module.<anonymous> (node:internal/modules/cjs/loader:1420:15)
2025-Nov-22 17:07:01.286572
#13 11.86     at /app/node_modules/next/dist/server/require-hook.js:55:36
2025-Nov-22 17:07:01.286572
#13 11.86     at require.resolve (node:internal/modules/helpers:163:19)
2025-Nov-22 17:07:01.286572
#13 11.86     at loadPlugin (/app/node_modules/next/dist/build/webpack/config/blocks/css/plugins.js:53:32)
2025-Nov-22 17:07:01.286572
#13 11.86     at /app/node_modules/next/dist/build/webpack/config/blocks/css/plugins.js:185:56
2025-Nov-22 17:07:01.286572
#13 11.86     at Array.map (<anonymous>)
2025-Nov-22 17:07:01.286572
#13 11.86     at getPostCssPlugins (/app/node_modules/next/dist/build/webpack/config/blocks/css/plugins.js:185:47)
2025-Nov-22 17:07:01.286572
#13 11.86     at async /app/node_modules/next/dist/build/webpack/config/blocks/css/index.js:125:36
2025-Nov-22 17:07:01.286572
#13 11.86     at async /app/node_modules/next/dist/build/webpack/loaders/next-font-loader/index.js:94:33
2025-Nov-22 17:07:01.286572
#13 11.86     at async Span.traceAsyncFn (/app/node_modules/next/dist/trace/trace.js:157:20)
2025-Nov-22 17:07:01.286572
#13 11.86
2025-Nov-22 17:07:01.286572
#13 11.86 ./node_modules/recharts/es6/util/ReactUtils.js
2025-Nov-22 17:07:01.286572
#13 11.86 Module not found: Can't resolve 'react-is'
2025-Nov-22 17:07:01.286572
#13 11.86
2025-Nov-22 17:07:01.286572
#13 11.86 https://nextjs.org/docs/messages/module-not-found
2025-Nov-22 17:07:01.286572
#13 11.86
2025-Nov-22 17:07:01.286572
#13 11.86 Import trace for requested module:
2025-Nov-22 17:07:01.286572
#13 11.86 ./node_modules/recharts/es6/cartesian/Bar.js
2025-Nov-22 17:07:01.286572
#13 11.86 __barrel_optimize__?names=Bar,BarChart,Cell,ResponsiveContainer,Tooltip,XAxis,YAxis!=!./node_modules/recharts/es6/index.js
2025-Nov-22 17:07:01.286572
#13 11.86 ./src/app/recruiter-results/page.tsx
2025-Nov-22 17:07:01.286572
#13 11.86
2025-Nov-22 17:07:01.286572
#13 11.86 ./src/app/about/page.tsx
2025-Nov-22 17:07:01.286572
#13 11.86 Module not found: Can't resolve '@/components/ui/button'
2025-Nov-22 17:07:01.286572
#13 11.86
2025-Nov-22 17:07:01.286572
#13 11.86 https://nextjs.org/docs/messages/module-not-found
2025-Nov-22 17:07:01.286572
#13 11.86
2025-Nov-22 17:07:01.286572
#13 11.86 ./src/app/about/page.tsx
2025-Nov-22 17:07:01.286572
#13 11.86 Module not found: Can't resolve '@/components/ui/card'
2025-Nov-22 17:07:01.286572
#13 11.86
2025-Nov-22 17:07:01.286572
#13 11.86 https://nextjs.org/docs/messages/module-not-found
2025-Nov-22 17:07:01.286572
#13 11.86
2025-Nov-22 17:07:01.286572
#13 11.86 ./src/app/about/page.tsx
2025-Nov-22 17:07:01.286572
#13 11.86 Module not found: Can't resolve '@/components/ui/badge'
2025-Nov-22 17:07:01.286572
#13 11.86
2025-Nov-22 17:07:01.286572
#13 11.86 https://nextjs.org/docs/messages/module-not-found
2025-Nov-22 17:07:01.286572
#13 11.86
2025-Nov-22 17:07:01.286572
#13 11.92
2025-Nov-22 17:07:01.286572
#13 11.92 > Build failed because of webpack errors
2025-Nov-22 17:07:01.286572
#13 11.99 error Command failed with exit code 1.
2025-Nov-22 17:07:01.286572
#13 11.99 info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
2025-Nov-22 17:07:01.286572
#13 ERROR: process "/bin/bash -ol pipefail -c yarn run build" did not complete successfully: exit code: 1
2025-Nov-22 17:07:01.286572
------
2025-Nov-22 17:07:01.286572
> [stage-0  9/11] RUN --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-next/cache,target=/app/.next/cache --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-node_modules/cache,target=/app/node_modules/.cache yarn run build:
2025-Nov-22 17:07:01.286572
11.86
2025-Nov-22 17:07:01.286572
11.86 ./src/app/about/page.tsx
2025-Nov-22 17:07:01.286572
11.86 Module not found: Can't resolve '@/components/ui/badge'
2025-Nov-22 17:07:01.286572
11.86
2025-Nov-22 17:07:01.286572
11.86 https://nextjs.org/docs/messages/module-not-found
2025-Nov-22 17:07:01.286572
11.86
2025-Nov-22 17:07:01.286572
11.92
2025-Nov-22 17:07:01.286572
11.92 > Build failed because of webpack errors
2025-Nov-22 17:07:01.286572
11.99 error Command failed with exit code 1.
2025-Nov-22 17:07:01.286572
11.99 info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
2025-Nov-22 17:07:01.286572
------
2025-Nov-22 17:07:01.286572
2025-Nov-22 17:07:01.286572
9 warnings found (use docker --debug to expand):
2025-Nov-22 17:07:01.286572
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ARG "NEXT_PUBLIC_SUPABASE_ANON_KEY") (line 11)
2025-Nov-22 17:07:01.286572
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ARG "SMTP_PASSWORD") (line 11)
2025-Nov-22 17:07:01.286572
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ARG "SUPABASE_SERVICE_ROLE_KEY") (line 11)
2025-Nov-22 17:07:01.286572
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ENV "NEXTAUTH_SECRET") (line 12)
2025-Nov-22 17:07:01.286572
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ENV "NEXT_PUBLIC_SUPABASE_ANON_KEY") (line 12)
2025-Nov-22 17:07:01.286572
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ENV "SUPABASE_SERVICE_ROLE_KEY") (line 12)
2025-Nov-22 17:07:01.286572
- UndefinedVar: Usage of undefined variable '$NIXPACKS_PATH' (line 18)
2025-Nov-22 17:07:01.286572
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ARG "NEXTAUTH_SECRET") (line 11)
2025-Nov-22 17:07:01.286572
- SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ENV "SMTP_PASSWORD") (line 12)
2025-Nov-22 17:07:01.286572
Dockerfile:24
2025-Nov-22 17:07:01.286572
--------------------
2025-Nov-22 17:07:01.286572
22 |     # build phase
2025-Nov-22 17:07:01.286572
23 |     COPY . /app/.
2025-Nov-22 17:07:01.286572
24 | >>> RUN --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-next/cache,target=/app/.next/cache --mount=type=cache,id=ygcggosc4k4wg04ck8k08w8s-node_modules/cache,target=/app/node_modules/.cache yarn run build
2025-Nov-22 17:07:01.286572
25 |
2025-Nov-22 17:07:01.286572
26 |
2025-Nov-22 17:07:01.286572
--------------------
2025-Nov-22 17:07:01.286572
ERROR: failed to build: failed to solve: process "/bin/bash -ol pipefail -c yarn run build" did not complete successfully: exit code: 1
2025-Nov-22 17:07:01.286572
exit status 1
2025-Nov-22 17:07:01.341688
Deployment failed. Removing the new version of your application.
2025-Nov-22 17:07:02.446396
Gracefully shutting down build container: xckk84gk8coookcos8k488oc