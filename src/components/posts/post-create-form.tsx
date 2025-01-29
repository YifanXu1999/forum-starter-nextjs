"use client"
import { Button } from "@heroui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import {Form} from "@heroui/form";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { useActionState } from "react";
import { startTransition } from "react";
import * as actions from "@/actions/index";
interface PostCreateFormProps {
  name: string
}

export default function PostCreateForm({name}: PostCreateFormProps) {
  const [state, formAction, isPending] = useActionState(actions.createPost, {errors: {}})
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("name", name)
    startTransition(() => {
      formAction(formData);
    })
  }

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button className="block ml-auto" color="secondary" variant="bordered">Create Post</Button>
      </PopoverTrigger>
      <PopoverContent>
      <Form  onSubmit={handleSubmit} >
          <div className="flex flex-col gap-2 p-4 w-80">
              <h3 className="text-xl font-bold">Create a Post</h3>
        
              <Input 
                name="title" 
                placeholder="Title" 
                label="Title"
                labelPlacement="outside"
                isInvalid={!!state.errors.title}
                errorMessage={state.errors.title}
       
              />
              <Textarea 
                name="content" 
                label="Content" 
                labelPlacement="outside" 
                placeholder="Write your post here..."
                isInvalid={!!state.errors.content}
                errorMessage={state.errors.content}

              />

              <Button isLoading={isPending} type="submit" color="primary">Submit</Button>
          </div>
        </Form>
      </PopoverContent>
    </Popover>
  )
}
