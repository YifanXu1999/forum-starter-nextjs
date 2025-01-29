'use server'

import { redirect } from 'next/navigation'

export  async function search(formData: FormData) {
  const searchContent = formData.get('searchContent')
  if(typeof searchContent !== 'string' || !searchContent) {
    redirect('/')
  }

  redirect(`/search?searchContent=${searchContent}`)
}