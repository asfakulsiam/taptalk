import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <>
      <div className="bg-background text-foreground min-h-screen absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[99999]">
        <div className="w-full max-w-md">
          <SignUp
            appearance={{
              elements: {
                rootBox: "w-full max-w-md", // Limit width (good for responsiveness)

                card: "rounded-lg border border-border bg-card px-6 py-4", // Adjust padding to control height

                // Header
                headerTitle: "text-xl font-semibold text-foreground",
                headerSubtitle: "text-sm text-muted-foreground",

                // Fields
                formFieldLabel: "text-sm font-medium text-foreground",
                formFieldInput:
                  "h-9 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground outline outline-1 outline-foreground/50 focus:border-foreground",

                // Password field
                formFieldInputPassword: "focus:ring-0",

                // Error state style
                formFieldInput__error:
                  "h-9 w-full rounded-md border border-destructive bg-background px-3 py-1.5 text-sm text-destructive outline-none ring-0 focus:border-destructive focus:outline-none focus:ring-0",

                // Button
                formButtonPrimary:
                  "bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-4 py-1.5 text-sm font-medium transition-colors w-full",

                // Footer & Actions
                footer: "flex justify-center mt-4",
                footerActionText: "text-sm text-muted-foreground",
                footerActionLink: "text-sm text-blue-500 hover:underline",
                formFieldAction: "text-xs text-primary hover:underline",

                // Password toggle
                formFieldInputShowPasswordButton: "text-muted-foreground",

                // Divider
                dividerLine: "bg-border",
                dividerText: "text-muted-foreground text-xs",

                // Social buttons
                socialButtonsBlockButton:
                  "border border-border bg-background hover:bg-muted h-9 rounded-md text-foreground w-full text-sm",
                socialButtonsIconButton:
                  "border border-border bg-background hover:bg-muted h-9 w-9 rounded-md text-foreground",

                // Alert
                alert: "bg-muted text-foreground p-3 rounded-md text-sm",
              },
              layout: {
                socialButtonsPlacement: "bottom",
                showOptionalFields: true,
              },
            }}
          />
        </div>
      </div>
    </>
  );
}
