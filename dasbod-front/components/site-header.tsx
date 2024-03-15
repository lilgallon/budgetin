"use client"

import * as React from "react"
import Link from "next/link"
import { useAuth0 } from "@auth0/auth0-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserAccountNav } from "@/components/user-account-nav"

export function SiteHeader() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0()

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
            {isAuthenticated ? (
              <UserAccountNav></UserAccountNav>
            ) : (
              <Button
                onClick={() => loginWithRedirect()}
                variant="outline"
                size="sm"
              >
                Login
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
