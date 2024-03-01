'use client'

import Link from "next/link"

import { siteConfig } from "@/config/site"
import {Button, buttonVariants} from "@/components/ui/button"
import {useAuth0} from "@auth0/auth0-react";

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          WIP
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          wip
        </p>
      </div>
    </section>
  )
}
