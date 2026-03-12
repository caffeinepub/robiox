// Auto-generated backend stub for projects without a Motoko backend
// This file satisfies TypeScript imports from config.ts and useActor.ts

import type { ActorConfig, Agent } from "@icp-sdk/core/agent";

export interface backendInterface {
  _initializeAccessControlWithSecret: (secret: string) => Promise<void>;
}

export interface CreateActorOptions {
  agent?: Agent;
  agentOptions?: Record<string, unknown>;
  actorOptions?: ActorConfig;
  processError?: (e: unknown) => never;
}

export class ExternalBlob {
  static fromURL(url: string): ExternalBlob {
    return new ExternalBlob(url);
  }

  private _url: string;

  constructor(url: string) {
    this._url = url;
  }

  onProgress?: (progress: number) => void;

  async getBytes(): Promise<Uint8Array> {
    const res = await fetch(this._url);
    return new Uint8Array(await res.arrayBuffer());
  }

  getURL(): string {
    return this._url;
  }
}

export function createActor(
  _canisterId: string,
  _uploadFile: (file: ExternalBlob) => Promise<Uint8Array>,
  _downloadFile: (bytes: Uint8Array) => Promise<ExternalBlob>,
  _options?: CreateActorOptions,
): backendInterface {
  return {
    _initializeAccessControlWithSecret: async () => {},
  };
}
