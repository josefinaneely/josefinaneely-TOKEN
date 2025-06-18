"""empty message
Revision ID: 1ca21b7ae465
Revises:
Create Date: 2025-06-18 15:49:42.243833
"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '1ca21b7ae465'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(
            sa.Column('email', sa.String(length=120), nullable=True))

    # Rellenar con emails únicos para que no falle la restricción
    op.execute("""
        UPDATE "user"
        SET email = 'user_' || id::text || '@example.com'
        WHERE email IS NULL
    """)

    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('email', nullable=False)
        batch_op.create_unique_constraint(None, ['email'])


def downgrade():
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_column('email')
