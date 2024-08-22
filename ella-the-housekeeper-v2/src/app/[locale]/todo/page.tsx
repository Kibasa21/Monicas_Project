import { TodoList } from "@/components/todo/TodoList";
import React from "react";

const todoPage: React.FC = () => {
    return (
        <div className="relative w-full">
            <TodoList className="absolute left-20 top-6 pb-14" />
        </div>
    );
}

export default todoPage;