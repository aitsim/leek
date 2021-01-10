import {search} from "./search";


export interface Common {
    getSeenTasksAndWorkers(app_name: string, app_env: string): any;
}

export class CommonSearch implements Common {

    getSeenTasksAndWorkers(app_name, app_env) {
        let query;
        if (app_env)
            query = {"match": {"app_env": app_env}};
        return search(
            app_name,
            {
                "size": 0,
                "query": query,
                "aggs": {
                    "seen_tasks": {
                        "terms": {"field": "name"}
                    },
                    "seen_workers": {
                        "terms": {"field": "hostname"}
                    },
                    "seen_states": {
                        "terms": {"field": "state"}
                    },
                    "seen_envs": {
                        "terms": {"field": "app_env"}
                    },
                    "seen_routing_keys": {
                        "terms": {"field": "routing_key"}
                    },
                    "seen_queues": {
                        "terms": {"field": "queue"}
                    },
                    "processed_events": {
                        "sum": {"field": "events_count"}
                    }
                }
            },
            {
                size: 0,
                from_: 0
            }
        )
    }
}
