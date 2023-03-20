import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginInput = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject: Project;
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
};


export type MutationCreateProjectArgs = {
  input: ProjectInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  options: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};

export type Project = {
  __typename?: 'Project';
  createdAt: Scalars['String'];
  currentVersion: Scalars['Float'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  likes: Scalars['Float'];
  name: Scalars['String'];
  orignalPosterId: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  pullRequests: PullRequest;
  read: Scalars['Boolean'];
  starredByUsers?: Maybe<User>;
  updatedAt: Scalars['String'];
  write: Scalars['Boolean'];
};

export type ProjectInput = {
  description: Scalars['String'];
  name: Scalars['String'];
  s3FileUrl: Scalars['String'];
};

export type PullRequest = {
  __typename?: 'PullRequest';
  accepts: Scalars['Float'];
  createdAt: Scalars['String'];
  description: Scalars['String'];
  from: User;
  id: Scalars['ID'];
  merged: Scalars['Boolean'];
  project: Project;
  s3FileUrl: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  views: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  project: Project;
  projects: Array<Project>;
  users: Array<User>;
};


export type QueryProjectArgs = {
  id: Scalars['String'];
};


export type QueryUsersArgs = {
  limit: Scalars['Int'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['String'];
  starredProjects: Project;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  verified: Scalars['Boolean'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type BasicUserFragment = { __typename?: 'User', id: string, username: string, email: string };

export type ProjectShortInfoFragment = { __typename?: 'Project', id: string, name: string, description?: string | null, previewUrl?: string | null, likes: number };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: string, username: string, email: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, username: string } | null };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: string, username: string, email: string } | null } };

export type ProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', id: string, name: string, description?: string | null, previewUrl?: string | null, likes: number }> };

export const BasicUserFragmentDoc = gql`
    fragment BasicUser on User {
  id
  username
  email
}
    `;
export const ProjectShortInfoFragmentDoc = gql`
    fragment ProjectShortInfo on Project {
  id
  name
  description
  previewUrl
  likes
}
    `;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(options: {usernameOrEmail: $usernameOrEmail, password: $password}) {
    user {
      ...BasicUser
    }
    errors {
      field
      message
    }
  }
}
    ${BasicUserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    id
    username
  }
}
    `;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};
export const RegisterDocument = gql`
    mutation Register($email: String!, $username: String!, $password: String!) {
  register(input: {email: $email, username: $username, password: $password}) {
    errors {
      field
      message
    }
    user {
      ...BasicUser
    }
  }
}
    ${BasicUserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const ProjectsDocument = gql`
    query Projects {
  projects {
    ...ProjectShortInfo
  }
}
    ${ProjectShortInfoFragmentDoc}`;

export function useProjectsQuery(options?: Omit<Urql.UseQueryArgs<ProjectsQueryVariables>, 'query'>) {
  return Urql.useQuery<ProjectsQuery, ProjectsQueryVariables>({ query: ProjectsDocument, ...options });
};