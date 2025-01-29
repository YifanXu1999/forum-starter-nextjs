"use client"

import { Button } from "@heroui/button"
import { Textarea } from "@heroui/input"
import { createComment } from "@/actions/create-comment"
import { startTransition, useActionState, useEffect, useRef } from "react"
import { useState } from "react"
interface CommentCreateFormProps {
  postId: string
  isOpen?: boolean
  parentId?: string
}

export default function CommentCreateForm({postId, isOpen = true, parentId = undefined}: CommentCreateFormProps) {
  const [state, formAction, isPending] = useActionState(createComment.bind(null, {postId, parentId}), {errors: {}})
  const [open, setOpen] = useState(isOpen)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    formData.set('postId', postId)
    startTransition(async () => {
      await formAction(formData) 
    })

  }

  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset()
    }
  }, [state])
  return (
    <div>
      {!open && <Button color="secondary" size="sm" variant="bordered" onClick={() => setOpen(!open)}>
        Reply
      </Button>}
      {open && <form className="space-y-3" onSubmit={handleSubmit} noValidate ref={formRef}>
        <Textarea 
          name="content" placeholder="Add a comment"
        isInvalid={!!state.errors.content}
        errorMessage={state.errors.content?.join(', ')}
      />
        <Button isLoading={isPending} type="submit" color="secondary" variant="bordered">Add Comment</Button>
      </form>}
    </div>
  )
}