import os
import sys

"""
Lightweight server launcher for Windows using Waitress.

Usage:
  - Install dependencies: `pip install -r requirements.txt`
  - Run: `python serve_with_waitress.py`

This is a Windows-friendly alternative to Gunicorn.
"""

def main():
    try:
        from waitress import serve
    except Exception as e:
        print("Waitress is not installed. Install it with:\n  pip install waitress")
        sys.exit(1)

    # Ensure project root is on sys.path
    root = os.path.dirname(os.path.abspath(__file__))
    if root not in sys.path:
        sys.path.insert(0, root)

    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'user.settings')
    try:
        from django.core.wsgi import get_wsgi_application
    except Exception as e:
        print('Error importing Django WSGI application:', e)
        sys.exit(1)

    application = get_wsgi_application()
    host = os.environ.get('SERVE_HOST', '127.0.0.1')
    port = int(os.environ.get('SERVE_PORT', 8000))
    print(f"Serving on http://{host}:{port} using Waitress")
    serve(application, host=host, port=port)


if __name__ == '__main__':
    main()
