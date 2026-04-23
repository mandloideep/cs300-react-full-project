import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useAppStore } from '@/store/useAppStore'

const formSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
})

async function fetchStudents() {
  return [
    { id: 1, name: 'Ari Kim', major: 'Computer Science' },
    { id: 2, name: 'Leo Cruz', major: 'Math' },
    { id: 3, name: 'Nora Patel', major: 'Physics' },
  ]
}

export function HomePage() {
  const clicks = useAppStore((state) => state.clicks)
  const increment = useAppStore((state) => state.increment)

  const { data = [] } = useQuery({
    queryKey: ['students'],
    queryFn: fetchStudents,
    staleTime: 60_000,
  })

  const columns = useMemo(
    () => [
      { accessorKey: 'name', header: 'Student' },
      { accessorKey: 'major', header: 'Major' },
    ],
    [],
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '' },
  })

  const onSubmit = () => {
    increment()
    reset()
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <motion.section
        className="md:col-span-2"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Minimal starter, fully wired</CardTitle>
            <CardDescription>
              Includes TanStack Query/Table, react-router data APIs, RHF + Zod, Zustand, framer-motion, lucide, and shadcn-style components.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Global clicks via Zustand: {clicks}</p>
          </CardContent>
        </Card>
      </motion.section>

      <Card>
        <CardHeader>
          <CardTitle>React Hook Form + Zod</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <Input placeholder="Enter a name" {...register('name')} />
            {errors.name ? <p className="text-sm text-red-600">{errors.name.message}</p> : null}
            <Button type="submit">Validate and increment</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>TanStack Table + Query</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
