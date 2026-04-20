FROM python:3.14-slim-trixie

# Install Debian packages
RUN set -eu;\
    export DEBIAN_FRONTEND='noninteractive';\
    apt-get update; apt-get -y upgrade;\
    apt-get -y install --no-install-recommends\
        fonts-linuxlibertine\
        git\
        libyaml-0-2\
        make\
        nodejs\
        npm\
        texlive-fonts-extra\
        texlive-lang-english\
        texlive-xetex;\
    rm -rf /var/cache/* /var/log/* /var/lib/apt/lists/* /tmp/*

# Install Python packages
RUN pip install pyyaml rendercv[full] uv
