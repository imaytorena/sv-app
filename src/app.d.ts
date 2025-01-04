import { KVNamespace } from '@cloudflare/workers-types';

declare global {
	namespace App {
		interface Platform {
			env?: {
				KV_NAMESPACE: KVNamespace;
			};
		}
	}
}

export {};