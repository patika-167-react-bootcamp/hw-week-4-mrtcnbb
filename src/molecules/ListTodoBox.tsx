import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';
import React, { FC, useState } from 'react';
import { Category, NewTodo, Status, Todo } from '../pages/home/Home';
import CategorySelectbox, { getCookie } from '../atoms/CategorySelectbox';
import TodoStatusSelectbox from '../atoms/TodoStatusSelectbox';
import StatusSelectbox from '../atoms/StatusSelectbox';

interface ListTodoBoxProps {
  categories: Category[];
  list: any;
  fetchTodos: () => void;
}

const ListTodoBox: FC<ListTodoBoxProps> = ({ categories, list, fetchTodos }) => {
  const [newTodo, setNewTodo] = useState<NewTodo>({} as NewTodo);

  const deleteTodo = (id: number) => {
    const token = getCookie('token');
    axios
      .delete(`http://18.196.80.227:80/todo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        fetchTodos();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (event: any) => {
    setNewTodo((prev: any) => ({ ...prev, categoryId: event.target.value }));
  };

  return (
    <Box
      id="add-todo-box"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        border: '1px solid mediumpurple',
        borderRadius: '10px',
        margin: '5px',
        padding: '5px',
        boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.15 )',
      }}
    >
      {list &&
        list.map((item: Todo) => {
          return (
            <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p>{item.title}</p>
              <FormControl sx={{ mt: 1, mb: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Kategori</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="Kategori"
                  value={item.categoryId}
                  onChange={(event: any) => handleChange(event)}
                  size="small"
                >
                  <MenuItem value="">None</MenuItem>
                  {categories &&
                    categories.map((category) => {
                      return (
                        <MenuItem key={category.id} value={category.id}>
                          {category.title}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              <TodoStatusSelectbox categoryId={item.categoryId} inputLabelText="Statü" selectedId={item.statusId} />
              <Button variant="contained" color="warning" size="small" onClick={() => deleteTodo(item.id)}>
                Sil
              </Button>
              <Button variant="contained" color="primary" size="small">
                Düzenle
              </Button>
            </Box>
          );
        })}
    </Box>
  );
};

export default ListTodoBox;
