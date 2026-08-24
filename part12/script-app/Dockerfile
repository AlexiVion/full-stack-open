FROM ubuntu:22.04

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y curl dos2unix

COPY script.sh .

RUN dos2unix script.sh && chmod +x script.sh

CMD ["./script.sh"]
