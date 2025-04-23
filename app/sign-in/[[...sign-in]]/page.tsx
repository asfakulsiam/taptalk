import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="flex flex-col justify-center items-center px-4 py-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <SignIn
          appearance={{
            elements: {
              rootBox: "w-full max-w-md", // control width
              card: "rounded-lg border border-border bg-card shadow-md px-6 py-4", // reduce card height via padding

              // Header
              headerTitle: "text-xl font-semibold text-foreground",
              headerSubtitle: "text-sm text-muted-foreground",

              // Fields
              formFieldLabel: "text-sm font-medium text-foreground",
              formFieldInput:
                "h-9 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground outline outline-1 outline-foreground/50 focus:border-foreground",

              // Password field
              formFieldInputPassword: "focus:ring-0",

              // Error state
              formFieldInput__error:
                "h-9 w-full rounded-md border border-destructive bg-background px-3 py-1.5 text-sm text-destructive outline-none ring-0 focus:border-destructive focus:outline-none focus:ring-0",

              // Button
              formButtonPrimary:
                "bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-4 py-1.5 text-sm font-medium transition-colors w-full",

              // Footer & Actions
              footer: "flex justify-center mt-4", // show footer now
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
  );
}
