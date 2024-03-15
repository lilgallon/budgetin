"use client"

import { useEffect, useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { AxiosResponse } from "axios"

import { http } from "@/lib/http"

export default function BudgetPage() {
  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    getAccessTokenSilently().then((token) => {
      http
        .authorized(token)
        .get("/api/messages/protected")
        .then((response: AxiosResponse) => {
          console.log(response)
        })
    })
  }, [])

  return <div>it works</div>
}
