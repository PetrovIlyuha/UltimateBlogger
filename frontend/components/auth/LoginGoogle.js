import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import { loginWithGoogle } from "../../actions/auth";
import { GOOGLE_CLIENT_ID } from "../../config";
