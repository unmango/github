# notsystemd

Planned repo: `unmango/notsystemd`.

## Description

Plenty of vendor software assumes systemd is PID 1, and breaks when split into containers that each run one process.
notsystemd is a stand-in for the parts of systemd such software talks to, built for a Kubernetes pod rather than a single container.
A sidecar owns a readiness (`NOTIFY_SOCKET`) socket per container and surfaces `READY=1` and `STATUS=` as the container's readiness.
It answers the `org.freedesktop.systemd1` and `org.freedesktop.timedate1` D-Bus interfaces from the containers' real state.
Small `systemctl`, `timedatectl`, and `sudo` shims cover software that shells out instead of using D-Bus.
The motivating case is UniFi OS Server, whose `unifi-core` drives its sibling services through all three.

Prior art: docker-systemctl-replacement replaces `systemctl` inside one container, but serves no D-Bus and no notify sockets across containers.

## Name

What it is, by what it isn't.
