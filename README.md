# ResumeFabric

ResumeFabric is a web application that allows users to create a resume by filling out a form. The user can then download the resume as a PDF.

## Getting Started

### 1. Using npm

Download node version 20.15 or higher from [Node.js](https://nodejs.org/). Then run the following commands:

```bash
npm install     # Install dependencies
npm run dev     # Run the development server
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 2. Using docker

First, make sure you have [Docker](https://www.docker.com/) installed on your machine. Build and run the docker container:

```bash
docker-compose -f ./deploy/compose.yaml up --build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts
```bash
npm run lint    # Lint the project
npm run format  # Format the project
```

## Frameworks and Libraries

- [Next.js](https://nextjs.org/) This project was bootstrapped with Create Next App.
- [TypeScript](https://www.typescriptlang.org/) TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.
- [Tailwind CSS](https://tailwindcss.com/) A utility-first CSS framework for rapidly building custom designs.
- [React Hook Form](https://react-hook-form.com/) Performant, flexible and extensible forms with easy-to-use client-side validation.
- [Zod](https://zod.dev/) TypeScript-first schema declaration and server-side validation library.
- [shadcn/ui](https://ui.shadcn.com/) A collection of React components.
- [Lucide Icon](https://lucide.dev/icons/) A simply beautiful open-source icons.
- [Drizzle ORM](https://orm.drizzle.team/) A simple and lightweight ORM.
- [React Simple WYSIWYG](https://www.npmjs.com/package/react-simple-wysiwyg) A simple and lightweight WYSIWYG editor.

## Contributing
You are welcome to contribute to this project.