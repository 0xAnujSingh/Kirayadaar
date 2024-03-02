import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "../../@/components/ui/calendar";
import { Form } from "../../@/components/ui/form";

function CalenderDialog({ submitData }) {
  const [currDate, setCurrDate] = useState(new Date());

  function validateDate() {
    console.log(new Date())
    const joiningDate = new Date(Date.parse(currDate));
    if (currDate < joiningDate) {
      alert("joining date must be greater than current date");
      return;
    }

    submitData(joiningDate);
  }
  return (
    <Form onSubmit={validateDate}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="ml-2"> Apply</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Joining Date</DialogTitle>
            <DialogDescription>
              When you want`s to start your tenancy
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Calendar
                mode="single"
                selected={currDate}
                onSelect={setCurrDate}
                className="rounded-md border shadow"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={validateDate}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Form>
  );
}

export default CalenderDialog;
