# Heroku Notes

## Datadog Agent
See the Datadog docs for more details:
https://docs.datadoghq.com/agent/basic_agent_usage/heroku/#installation

heroku labs:enable runtime-dyno-metadata -a $(heroku apps:info|grep ===|cut -d' ' -f2)
heroku buildpacks:add https://github.com/DataDog/heroku-buildpack-datadog.git#1.18
heroku config:add DD_API_KEY=a40079ede30071527cebad48a2050cc5

git push heroku master
