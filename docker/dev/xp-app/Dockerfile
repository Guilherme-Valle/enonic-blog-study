FROM leanon/enonic-xp:7.6.0

ARG REPO

ENV SEEDS_REPO=$REPO

EXPOSE 3000 3001 3005 3006

COPY launcher.sh /launcher.sh

RUN chmod +x /launcher.sh \
	&& echo "export SEEDS_REPO=$SEEDS_REPO" >> /etc/environment

CMD /launcher.sh
