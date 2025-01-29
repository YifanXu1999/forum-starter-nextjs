"use client"
import { Button } from "@heroui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import {Form} from "@heroui/form";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Chip } from "@heroui/chip";
import * as actions from "@/actions/index";
import { useActionState, startTransition } from "react";

export default function TopicCreateForm() {
   const [state, formAction, isPending] = useActionState(actions.createTopic, {errors: {}})
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      formAction(formData);
    })
  }
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button className="block ml-auto" color="secondary" variant="bordered">Create a Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
      <Form onSubmit={handleSubmit} >
          <div className="flex flex-col gap-2 p-4 w-80">
              <h3 className="text-xl font-bold">Create a Topic</h3>
        
              <Input 
                name="name" 
                placeholder="Name" 
                label="Name"
                labelPlacement="outside"
                isInvalid={!!state.errors.name}
                errorMessage={state.errors.name?.join(", ")}
              />
              <Textarea 
                name="description" 
                label="Description" 
                labelPlacement="outside" 
                placeholder="Write your post here..."
                isInvalid={!!state.errors.description}
                errorMessage={state.errors.description?.join(", ")}
              />
              {state.errors._form && <Chip variant="bordered" radius="sm" className="max-w-full" color="danger">
                <div className="text-red-500 ml-4">
                  {state.errors._form.join(", ")}
                </div>
              </Chip>}
              <Button isLoading={isPending} type="submit" color="primary">Submit</Button>
          </div>
        </Form>
      </PopoverContent>
    </Popover>
  )
}
