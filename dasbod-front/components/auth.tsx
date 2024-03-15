"use client"

import process from "process"
import { Auth0Provider } from "@auth0/auth0-react"

export default function Auth({ children }: { children: React.ReactNode }) {
  return (
    <Auth0Provider
      domain={process.env.AUTH0_DOMAIN!}
      clientId={process.env.AUTH0_CLIENT_ID!}
      authorizationParams={{
        redirect_uri: process.env.AUTH0_CALLBACK_URL,
        scope: "openid profile email",
        audience: process.env.AUTH0_AUDIENCE,
      }}
    >
      {children}
    </Auth0Provider>
  )
}
