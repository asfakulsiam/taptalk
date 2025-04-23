import { connectDB } from "@/lib/mongodb";
import User from "@/models/userModel";
import { currentUser } from "@clerk/nextjs/server";

export async function POST() {
  await connectDB();

  const clerkUser = await currentUser();

  if (!clerkUser) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const existingUser = await User.findOne({ clerkUserId: clerkUser.id });

    const newUserData = {
      name: [clerkUser.firstName, clerkUser.lastName]
        .filter(Boolean)
        .join(" ")
        .trim(),
      email: clerkUser.emailAddresses?.[0]?.emailAddress || "",
      username: clerkUser.username || "",
      profileImageUrl: clerkUser.imageUrl || "",
    };

    if (!existingUser) {
      await User.create({
        clerkUserId: clerkUser.id,
        ...newUserData,
      });
    } else {
      const hasChanges =
        existingUser.name !== newUserData.name ||
        existingUser.email !== newUserData.email ||
        existingUser.username !== newUserData.username ||
        existingUser.profileImageUrl !== newUserData.profileImageUrl;

      if (hasChanges) {
        await User.updateOne(
          { clerkUserId: clerkUser.id },
          { $set: newUserData }
        );
      }
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    return new Response("Server Error", { status: 500 });
  }
}
