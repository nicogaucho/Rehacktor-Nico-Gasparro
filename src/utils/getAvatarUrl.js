export function getAvatarUrl(file) {
  if (!file) {
    return 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngkey.com%2Fpng%2Ffull%2F73-730477_first-name-profile-image-placeholder-png.png&f=1&nofb=1&ipt=9fd35c1e6f30802c648a62b4f7864999f702fe9d723316e4127e4122e88cc74c&ipo=images'
  }
  return `https://pjqljjmdgggepgfvqjqa.supabase.co/storage/v1/object/sign/avatars/${file}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzLzAuMjYwMzg2NjI0MTIxNDMxNTQucG5nIiwiaWF0IjoxNzM0MDMwMTI2LCJleHAiOjE3NjU1NjYxMjZ9.tgshPuRrqnn-crfB_0W4tqKazv02xHy7nZncIyOtl2Y&t=2024-12-12T19%3A02%3A06.451Z`
}